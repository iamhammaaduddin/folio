import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';

// 1. Initialize Supabase Admin (Server-side ONLY)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 2. Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    // Parse the incoming form data from Twilio
    const formData = await req.formData();
    const body = formData.get('Body'); 
    const from = formData.get('From'); 

    if (!body || !from) {
      return new NextResponse('Missing data', { status: 400 });
    }

    // 3. Authenticate the User
    const { data: userProfile, error: userError } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('whatsapp_number', from)
      .single();

    if (userError || !userProfile) {
      return sendTwilioReply("Welcome to Folio! Please link this WhatsApp number in your dashboard to start saving notes.");
    }

    // 4. Pass the message to Groq (Llama 3.3 70B)
    const prompt = `
      You are the silent, organizational brain for a personal notes app. 
      Analyze the following captured note and return a JSON object with these exact keys:
      - "type": strictly one of ["idea", "read", "buy", "task", "note"]
      - "topics": an array of 1 to 3 short topic tags (e.g. ["startup", "design"])
      - "priority": strictly one of ["high", "medium", "low"]
      - "summary": one concise sentence summarizing the note (max 15 words)
      - "title": a very short title (max 6 words)

      Note to analyze: "${body}"
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }, // Forces clean JSON output
    });
    
    // Safely parse the guaranteed JSON returned by Groq
    let aiTags = {};
    try {
      aiTags = JSON.parse(chatCompletion.choices[0].message.content);
    } catch (e) {
      console.error("Groq Parse Error:", e);
      aiTags = { type: 'note', topics: ['untagged'], priority: 'low', summary: 'Captured note', title: 'New Note' };
    }

    // 5. Save the fully tagged note to Supabase
    const { error: insertError } = await supabaseAdmin
      .from('captures')
      .insert({
        user_id: userProfile.id,
        text: body,
        source: 'whatsapp',
        raw_whatsapp_from: from,
        type: aiTags.type,
        topics: aiTags.topics,
        priority: aiTags.priority,
        summary: aiTags.summary,
        title: aiTags.title
      });

    if (insertError) throw insertError;

    // 6. Send a success receipt back to WhatsApp
    return sendTwilioReply(`✅ Saved to Folio: ${aiTags.title}`);

  } catch (error) {
    console.error("Webhook Error:", error);
    return sendTwilioReply("⚠️ Sorry, Folio encountered an error saving your note.");
  }
}

// Keep the GET route for quick browser testing
export async function GET() {
  return NextResponse.json({ status: "Webhook route is active!" });
}

// Helper function to format the XML response that Twilio expects
function sendTwilioReply(message) {
  const xml = `
    <Response>
      <Message>${message}</Message>
    </Response>
  `;
  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}