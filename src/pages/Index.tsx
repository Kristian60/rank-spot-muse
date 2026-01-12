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
          {/* Sidebar */}
          <aside className="w-full lg:w-56 space-y-4 lg:order-first order-last">
            <LeagueSelector />
            
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="section-header">
                <h2 className="section-title">Season Info</h2>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Matchday</span>
                  <span className="font-bold">26 of 38</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "68%" }} />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground text-xs">Season</span>
                  <span className="font-bold">2024-25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Teams</span>
                  <span className="font-bold">20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Avg Goals</span>
                  <span className="font-bold">2.78</span>
                </div>
              </div>
            </div>
          </aside>
          
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
        </div>
      </main>
      
      <footer className="bg-header text-header-foreground mt-12">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-header font-black text-2xs">SR</span>
              </div>
              <span className="font-bold text-sm">SPORTS RANKINGS</span>
            </div>
            <div className="text-xs text-header-foreground/60">
              Data provided for demonstration purposes · Updated weekly
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
