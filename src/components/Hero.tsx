export function Hero() {
  return (
    <div className="py-20 text-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-transparent to-transparent -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-transparent via-muted/30 to-transparent rounded-full blur-3xl -z-10" />
      <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
        The Global CrossFit Ranking System
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Track athlete performance across competitions worldwide. Real-time rankings, 
        historical results, and comprehensive athlete profiles.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button className="px-5 py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Explore Rankings
        </button>
        <button className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          View Athletes
        </button>
      </div>
    </div>
  );
}
