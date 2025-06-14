
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

// This type describes a single form response as a generic { [field: string]: string } object
export type Response = Record<string, string>;

export function useAISummary() {
  const [responses, setResponses] = useState<Response[]>([]);

  // Function to add a new response
  const addResponse = (response: Response) => {
    setResponses((prev) => [...prev, response]);
  };

  // Mutation to get the AI summary from OpenAI
  const { data: summary, isLoading, error, mutate: generateSummary } = useMutation<string, Error>({
    mutationFn: async (responsesForAi: Response[]) => {
      if (responsesForAi.length === 0) return "";

      // Compose a prompt for GPT
      const prompt = `
You are an AI assistant analyzing feedback from form submissions. Given the following user responses, generate a short, clear professional summary highlighting main trends, insights, and pain points. Keep the tone objective, remove repetition, and only include relevant points.

Responses:
${responsesForAi
  .map(
    (r, idx) =>
      `${idx + 1}. ` +
      Object.entries(r)
        .map(([field, val]) => `${field}: ${val}`)
        .join("; ")
  )
  .join("\n")}

Summary:
`;

      // Call OpenAI API
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add your OpenAI API key here, or better: retrieve from a secret!
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4o", // fast/good, or use gpt-3.5-turbo for cheaper
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

      const json = await resp.json();
      if (json.choices && json.choices[0] && json.choices[0].message) {
        return json.choices[0].message.content.trim();
      }
      throw new Error("OpenAI API error: " + (json.error?.message || "unknown"));
    },
  });

  return {
    responses,
    addResponse,
    generateSummary,
    summary,
    isLoading,
    error,
  };
}
