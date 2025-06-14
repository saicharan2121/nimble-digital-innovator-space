
import React, { createContext, useContext } from "react";
import { useAISummary, Response } from "./useAISummary";

type IAISummaryContext = ReturnType<typeof useAISummary>;

// Create context
const AISummaryContext = createContext<IAISummaryContext | undefined>(undefined);

// Provider wraps children and shares ai summary state
export function AISummaryProvider({ children }: { children: React.ReactNode }) {
  const value = useAISummary();
  return (
    <AISummaryContext.Provider value={value}>
      {children}
    </AISummaryContext.Provider>
  );
}

// This hook replaces useAISummary everywhere in the app
export function useAISummaryContext() {
  const ctx = useContext(AISummaryContext);
  if (!ctx) {
    throw new Error("useAISummaryContext must be used within AISummaryProvider");
  }
  return ctx;
}
