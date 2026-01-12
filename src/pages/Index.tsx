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
      
      <main className="container py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 space-y-12">
            <StatsCards />
            
            <div className="border-t border-border pt-10">
              <RankingsTable />
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 border-t border-border pt-10">
              <PerformanceChart />
              <RecentMatches />
            </div>
            
            <div className="border-t border-border pt-10">
              <TopScorers />
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-8">
            <LeagueSelector />
            
            <div className="border-t border-border pt-6">
              <h2 className="text-sm font-medium text-foreground mb-3">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Matchday</span>
                  <span className="font-medium tabular-nums text-sm">26 / 38</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Season</span>
                  <span className="font-medium text-sm">2024-25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Teams</span>
                  <span className="font-medium tabular-nums text-sm">20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Avg Goals</span>
                  <span className="font-medium tabular-nums text-sm">2.78</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="text-xs text-muted-foreground mb-1">
                Last Updated
              </div>
              <div className="text-sm font-medium">Jan 12, 2026</div>
              <div className="text-xs text-muted-foreground mt-0.5">18:45 UTC</div>
            </div>
          </aside>
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
