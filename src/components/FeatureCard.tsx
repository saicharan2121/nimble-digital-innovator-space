
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type FeatureCardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export default function FeatureCard({ title, icon, children }: FeatureCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto md:mx-0 shadow-lg bg-card/90 transition-transform hover:scale-105 hover:shadow-xl animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        {icon && <div className="text-primary">{icon}</div>}
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-base text-muted-foreground">{children}</CardContent>
    </Card>
  );
}
