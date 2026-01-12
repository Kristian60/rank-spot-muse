import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RecentCompetitions } from "@/components/RecentCompetitions";
import { WorldRankings } from "@/components/WorldRankings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-8">
        <Hero />
        
        <div className="space-y-20 pb-16">
          <RecentCompetitions />
          
          <div className="border-t border-border pt-16">
            <WorldRankings />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border mt-24">
        <div className="max-w-6xl mx-auto px-8 py-10 text-center text-sm text-muted-foreground">
          Data provided for demonstration purposes · Rankings updated weekly
        </div>
      </footer>
    </div>
  );
};

export default Index;
