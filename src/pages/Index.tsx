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
          <aside className="w-full lg:w-64 space-y-4">
            <LeagueSelector />
            
            <div className="carbon-tile">
              <div className="carbon-tile-header">
                <h2 className="carbon-tile-title">Quick Stats</h2>
              </div>
              <div className="divide-y divide-border">
                <div className="px-4 py-3 flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Matchday</span>
                  <span className="font-semibold font-mono">26 / 38</span>
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Season</span>
                  <span className="font-semibold font-mono">2024-25</span>
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Teams</span>
                  <span className="font-semibold font-mono">20</span>
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Avg Goals</span>
                  <span className="font-semibold font-mono">2.78</span>
                </div>
              </div>
            </div>
            
            <div className="carbon-tile p-4">
              <div className="text-xs text-muted-foreground mb-1">
                Last Updated
              </div>
              <div className="text-sm font-semibold font-mono">Jan 12, 2026</div>
              <div className="text-xs text-muted-foreground mt-1">18:45 UTC</div>
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
