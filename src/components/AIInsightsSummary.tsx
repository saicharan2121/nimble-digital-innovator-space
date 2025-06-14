
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useAISummaryContext } from "@/hooks/AISummaryContext";

export default function AIInsightsSummary() {
  const { summary, isLoading, error, responses } = useAISummaryContext();

  // If there are no responses yet, encourage user to submit
  if (!responses.length) {
    return (
      <Card className="max-w-xl mx-auto bg-muted/60 shadow-xl rounded-xl border-0 p-0 animate-fade-in">
        <CardHeader className="flex flex-row items-center gap-3 pb-0 pt-6 px-6">
          <div className="bg-primary/10 rounded-full p-2">
            <Lightbulb className="text-yellow-500" size={28} strokeWidth={2.1} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold leading-tight text-primary mb-1">
              AI Summary of Responses
            </CardTitle>
            <span className="block text-sm text-muted-foreground font-medium">
              Top feedback trends & insights
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-5 pb-7 px-6">
          <p className="text-base text-foreground bg-white/70 rounded-md p-4 shadow-inner leading-relaxed">
            Submit responses to see real-time AI insights here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto bg-muted/60 shadow-xl rounded-xl border-0 p-0 animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-3 pb-0 pt-6 px-6">
        <div className="bg-primary/10 rounded-full p-2">
          <Lightbulb className="text-yellow-500" size={28} strokeWidth={2.1} />
        </div>
        <div>
          <CardTitle className="text-xl font-bold leading-tight text-primary mb-1">
            AI Summary of Responses
          </CardTitle>
          <span className="block text-sm text-muted-foreground font-medium">
            Trends, insights, and pain points detected by AI
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-5 pb-7 px-6">
        {error && (
          <p className="text-base text-red-700 bg-white/80 rounded-md p-4 leading-relaxed">
            Failed to generate summary: {error.message}
          </p>
        )}
        {!error && (isLoading ? (
          <p className="text-base text-foreground bg-white/70 rounded-md p-4 shadow-inner animate-pulse">
            Generating AI-powered summary...
          </p>
        ) : (
          <p className="text-base text-foreground bg-white/70 rounded-md p-4 shadow-inner leading-relaxed whitespace-pre-line">
            {summary || "No summary yet. Please submit a response."}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
