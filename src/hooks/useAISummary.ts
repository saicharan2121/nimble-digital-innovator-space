
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export type Response = Record<string, string>;

export function useAISummary() {
  const [responses, setResponses] = useState<Response[]>([]);

  // Function to add a new response
  const addResponse = (response: Response) => {
    setResponses((prev) => [...prev, response]);
  };

  // Mutation to get the AI summary from Supabase Edge Function
  const {
    data: summary,
    isPending,
    error,
    mutate: generateSummary
  } = useMutation<string, Error, Response[]>({
    mutationFn: async (responsesForAi) => {
      if (responsesForAi.length === 0) return "";

      const resp = await fetch("/functions/v1/generate-ai-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ responses: responsesForAi }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error("Edge function error: " + errText);
      }

      const json = await resp.json();
      if (typeof json.summary === "string") {
        return json.summary;
      }
      throw new Error("Malformed response from edge function");
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
