
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// WARNING: Never use a secret key like this in production!
// YOUR PERSONAL OPENAI KEY IS HARDCODED HERE!
const OPENAI_API_KEY = "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";

export type Response = Record<string, string>;

export function useAISummary() {
  const [responses, setResponses] = useState<Response[]>([]);

  // Function to add a new response
  const addResponse = (response: Response) => {
    setResponses((prev) => [...prev, response]);
  };

  // Mutation to get the AI summary from OpenAI directly
  const {
    data: summary,
    isPending,
    error,
    mutate: generateSummary
  } = useMutation<string, Error, Response[]>({
    mutationFn: async (responsesForAi) => {
      if (responsesForAi.length === 0) return "";

      // Craft a prompt from the collected responses
      const prompt = `
Form responses from a form builder feedback survey:
${responsesForAi
  .map(
    (resp, i) =>
      `Response ${i + 1}:\n${Object.entries(resp)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n")}`
  )
  .join("\n\n")}

Summarize the most notable trends, feedback themes, and pain points found in these responses. Aim for a concise high-level AI summary (120 words or less).
`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert form feedback analyst who only ever responds with a single concise paragraph summary of observed trends in user feedback.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 350,
          temperature: 0.4,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error("OpenAI API error: " + err);
      }
      const json = await res.json();

      // Extract summary from OpenAI's response
      const summary =
        json.choices && json.choices[0] && json.choices[0].message
          ? json.choices[0].message.content
          : null;
      if (typeof summary === "string") {
        return summary;
      }
      throw new Error("Malformed response from OpenAI API");
    },
  });

  return {
    responses,
    addResponse,
    generateSummary,
    summary,
    isLoading: isPending, // backwards compatible
    error,
  };
}
