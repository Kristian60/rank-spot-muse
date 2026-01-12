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
      
      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 space-y-8">
            <StatsCards />
            <RankingsTable />
            
            <div className="grid md:grid-cols-2 gap-6">
              <PerformanceChart />
              <RecentMatches />
            </div>
            
            <TopScorers />
          </div>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-6">
            <LeagueSelector />
            
            <div className="mat-card-elevated overflow-hidden">
              <div className="mat-card-header">
                <h2 className="text-sm font-medium text-foreground">Quick Stats</h2>
              </div>
              <div>
                <div className="px-5 py-4 flex justify-between items-center border-b border-border">
                  <span className="text-muted-foreground text-sm">Matchday</span>
                  <span className="font-medium tabular-nums">26 / 38</span>
                </div>
                <div className="px-5 py-4 flex justify-between items-center border-b border-border">
                  <span className="text-muted-foreground text-sm">Season</span>
                  <span className="font-medium">2024-25</span>
                </div>
                <div className="px-5 py-4 flex justify-between items-center border-b border-border">
                  <span className="text-muted-foreground text-sm">Teams</span>
                  <span className="font-medium tabular-nums">20</span>
                </div>
                <div className="px-5 py-4 flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Avg Goals</span>
                  <span className="font-medium tabular-nums">2.78</span>
                </div>
              </div>
            </div>
            
            <div className="mat-card-elevated p-5">
              <div className="text-xs text-muted-foreground mb-1">
                Last Updated
              </div>
              <div className="text-base font-medium">Jan 12, 2026</div>
              <div className="text-xs text-muted-foreground mt-1">18:45 UTC</div>
            </div>
          </aside>
        </div>
      </main>
      
      <footer className="border-t border-border mt-16">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          Data provided for demonstration purposes · Rankings updated weekly
        </div>
      </footer>
    </div>
  );
};

export default Index;
