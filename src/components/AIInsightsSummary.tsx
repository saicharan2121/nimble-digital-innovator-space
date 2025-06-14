
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const MOCK_SUMMARY =
  "Most users praised the form builder's usability and clean design. Several mentioned minor bugs in mobile view. Custom field logic is a requested feature.";

export default function AIInsightsSummary() {
  return (
    <Card className="max-w-xl mx-auto bg-muted/60 shadow-xl rounded-xl border-0 p-0 animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-3 pb-0 pt-6 px-6">
        <div className="bg-primary/10 rounded-full p-2">
          <Lightbulb className="text-yellow-500" size={28} strokeWidth={2.1} />
        </div>
        <div>
          <CardTitle className="text-xl font-bold leading-tight text-primary mb-1">
            AI Insights Summary
          </CardTitle>
          <span className="block text-sm text-muted-foreground font-medium">
            Top feedback themes detected by AI
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-5 pb-7 px-6">
        <p className="text-base text-foreground bg-white/70 rounded-md p-4 shadow-inner leading-relaxed">
          {MOCK_SUMMARY}
        </p>
      </CardContent>
    </Card>
  );
}

