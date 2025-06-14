
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Entry point for Supabase Edge Function
serve(async (req) => {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Get OpenAI API Key securely from Supabase Vault
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response("Missing OPENAI_API_KEY in Vault", { status: 500 });
    }

    // Parse incoming JSON
    const { responses } = await req.json();

    if (!Array.isArray(responses) || responses.length === 0) {
      return Response.json({ summary: "" });
    }

    // Craft OpenAI prompt
    const prompt = `
You are an AI assistant analyzing feedback from form submissions. Given the following user responses, generate a short, clear professional summary highlighting main trends, insights, and pain points. Keep the tone objective, remove repetition, and only include relevant points.

Responses:
${responses
  .map(
    (r: Record<string, string>, idx: number) =>
      `${idx + 1}. ` +
      Object.entries(r)
        .map(([field, val]) => `${field}: ${val}`)
        .join("; ")
  )
  .join("\n")}

Summary:
`;

    // Call OpenAI Chat Completion API
    const aiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You summarize user feedback into clear, concise, objective insights for product teams.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 220,
        temperature: 0.35,
      }),
    });

    const aiJson = await aiResp.json();
    if (aiJson.choices && aiJson.choices[0] && aiJson.choices[0].message) {
      return Response.json({
        summary: aiJson.choices[0].message.content.trim(),
      });
    }
    return new Response(
      aiJson?.error?.message
        ? "OpenAI API Error: " + aiJson.error.message
        : "Unknown OpenAI API error",
      { status: 500 },
    );
  } catch (e) {
    return new Response("Error: " + (e as Error).toString(), { status: 500 });
  }
});
