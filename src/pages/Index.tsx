import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Wand2, Sparkles, Tags, BarChart3, TrendingUp } from "lucide-react";
import FormBuilder from "@/components/FormBuilder";

const features = [
  {
    title: "Drag-and-drop form builder",
    icon: <Wand2 size={32} strokeWidth={2.2} />,
    description:
      "Build custom forms in seconds. Add, reorder, and configure fields with an intuitive drag-and-drop interface—no coding required."
  },
  {
    title: "AI summary of responses",
    icon: <Sparkles size={32} strokeWidth={2.2} />,
    description:
      "Instant AI-powered summaries highlight patterns and key takeaways from every batch of responses, saving hours of manual review."
  },
  {
    title: "Real-time response tagging",
    icon: <Tags size={32} strokeWidth={2.2} />,
    description:
      "Automatically tag and categorize incoming responses as they arrive, enabling smarter segmentation and faster filtering."
  },
  {
    title: "Embed & analytics dashboard",
    icon: <BarChart3 size={32} strokeWidth={2.2} />,
    description:
      "Embed your live forms anywhere and monitor analytics—track views, completions, and user journeys in a single dashboard."
  },
  {
    title: "Insights dashboard with trends",
    icon: <TrendingUp size={32} strokeWidth={2.2} />,
    description:
      "Go beyond raw data—visualize trends over time and get actionable insights to optimize your forms and grow your business."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted flex flex-col">
      {/* Top Navbar */}
      <header className="w-full flex-shrink-0 py-4 px-4 md:px-8 bg-card/95 border-b border-border flex items-center justify-between shadow-sm z-20">
        <span className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
          FormWise <span className="text-primary/80">AI</span>
        </span>
        {/* Add nav links or actions here in the future */}
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-2 sm:px-6 py-8">
        {/* Hero */}
        <section className="max-w-3xl w-full text-center my-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary drop-shadow-lg">
            Smarter Forms. Instant Insights.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Effortlessly create, share, and analyze forms with next-generation AI tools. Transform responses into intelligence—no manual work needed.
          </p>
          <Button
            size="lg"
            className="text-base font-semibold shadow-md hover-scale"
            onClick={() => window.open("https://docs.lovable.dev/", "_blank")}
          >
            Try FormWise AI
          </Button>
        </section>
        {/* --- Drag & Drop Form Builder Section --- */}
        <FormBuilder />

        {/* Features Grid */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-12">
          {features.slice(0, 2).map((feat, i) => (
            <FeatureCard
              key={feat.title}
              title={feat.title}
              icon={feat.icon}
            >
              {feat.description}
            </FeatureCard>
          ))}
        </section>
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {features.slice(2).map((feat, i) => (
            <FeatureCard
              key={feat.title}
              title={feat.title}
              icon={feat.icon}
            >
              {feat.description}
            </FeatureCard>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;
