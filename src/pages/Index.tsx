
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-secondary to-muted flex items-center justify-center relative overflow-hidden px-4">
      {/* Radial Soft Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[500px] bg-primary opacity-10 blur-3xl rounded-full" />
      </div>
      <main className="relative z-10 w-full max-w-3xl mx-auto text-center px-6 py-16 rounded-2xl bg-card/80 shadow-xl animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-4 drop-shadow-lg">
          Welcome to Your Next Big Idea
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          Let’s build something amazing. This desktop-first starter is designed for serious web apps—clean, modern, and ready for anything.
        </p>
        <Button
          size="lg"
          className="text-base font-semibold shadow-md hover-scale animate-fade-in"
          onClick={() => window.open('https://docs.lovable.dev/', '_blank')}
        >
          Get Started
        </Button>
      </main>
    </div>
  );
};

export default Index;
