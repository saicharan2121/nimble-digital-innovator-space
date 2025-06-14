
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export type Response = Record<string, string>;

// CHANGE THIS: Set to your Supabase project ref (the part before `.supabase.co` in your dashboard URL)
const SUPABASE_PROJECT_REF = ""; // e.g. "abc123xyz456"

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

      // Use the absolute Supabase Edge Function URL for Lovable/Netlify/Vercel, etc.
      if (!SUPABASE_PROJECT_REF) {
        throw new Error(
          "Supabase project ref not set. Please set SUPABASE_PROJECT_REF in useAISummary.ts"
        );
      }

      const edgeFunctionUrl = `https://${SUPABASE_PROJECT_REF}.functions.supabase.co/generate-ai-summary`;

      const res = await fetch(edgeFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses: responsesForAi
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error("Supabase Edge Function error: " + err);
      }

      const json = await res.json();

      // Extract summary from Edge Function's response
      if (typeof json.summary === "string") {
        return json.summary;
      }
      throw new Error("Malformed response from backend function");
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
