export function Hero() {
  return (
    <div className="py-20 text-center">
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
