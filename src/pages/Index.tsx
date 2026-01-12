import { Header } from "@/components/Header";
import { RecentCompetitions } from "@/components/RecentCompetitions";
import { WorldRankings } from "@/components/WorldRankings";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-10">
        <div className="space-y-12">
          <RecentCompetitions />
          
          <div className="border-t border-border pt-10">
            <WorldRankings />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border mt-20">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          Data provided for demonstration purposes · Rankings updated weekly
        </div>
      </footer>
    </div>
  );
};

export default Index;
