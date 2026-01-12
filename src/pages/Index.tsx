import { Header } from "@/components/Header";
import { RankingsTable } from "@/components/RankingsTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { RecentMatches } from "@/components/RecentMatches";
import { StatsCards } from "@/components/StatsCards";
import { TopScorers } from "@/components/TopScorers";
import { LeagueSelector } from "@/components/LeagueSelector";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 space-y-6">
            <StatsCards />
            <RankingsTable />
            
            <div className="grid md:grid-cols-2 gap-6">
              <PerformanceChart />
              <RecentMatches />
            </div>
            
            <TopScorers />
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-6">
            <LeagueSelector />
            
            <div className="border border-border rounded overflow-hidden">
              <div className="bg-secondary px-4 py-3 border-b border-border">
                <h2 className="text-sm font-semibold">Quick Stats</h2>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matchday</span>
                  <span className="font-semibold">26 of 38</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Season</span>
                  <span className="font-semibold">2024-25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teams</span>
                  <span className="font-semibold">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Goals</span>
                  <span className="font-semibold">2.78</span>
                </div>
              </div>
            </div>
            
            <div className="border border-border rounded p-4">
              <div className="text-2xs uppercase tracking-wider text-muted-foreground mb-2">
                Last Updated
              </div>
              <div className="text-sm font-medium">Jan 12, 2026</div>
              <div className="text-2xs text-muted-foreground">18:45 UTC</div>
            </div>
          </aside>
        </div>
      </main>
      
      <footer className="border-t border-border mt-12">
        <div className="container py-4 text-center text-xs text-muted-foreground">
          Data provided for demonstration purposes · Rankings updated weekly
        </div>
      </footer>
    </div>
  );
};

export default Index;
