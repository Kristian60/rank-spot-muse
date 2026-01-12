interface Match {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  date: string;
  time: string;
  status: "FT" | "LIVE" | "HT";
}

const matches: Match[] = [
  { home: "Arsenal", away: "Chelsea", homeScore: 3, awayScore: 1, date: "Jan 12", time: "17:30", status: "FT" },
  { home: "Liverpool", away: "Man United", homeScore: 2, awayScore: 2, date: "Jan 12", time: "15:00", status: "FT" },
  { home: "Man City", away: "Tottenham", homeScore: 4, awayScore: 0, date: "Jan 11", time: "20:00", status: "FT" },
  { home: "Newcastle", away: "Brighton", homeScore: 1, awayScore: 0, date: "Jan 11", time: "17:30", status: "FT" },
  { home: "Aston Villa", away: "West Ham", homeScore: 2, awayScore: 1, date: "Jan 11", time: "15:00", status: "FT" },
];

function MatchRow({ match }: { match: Match }) {
  const homeWin = match.homeScore > match.awayScore;
  const awayWin = match.awayScore > match.homeScore;
  
  return (
    <div className="px-4 py-3 flex items-center hover:bg-muted/40 transition-colors cursor-pointer group">
      <div className="flex-1 flex items-center gap-2">
        <div className="flex flex-col items-end flex-1">
          <span className={`text-sm ${homeWin ? "font-bold" : "font-medium text-muted-foreground"}`}>
            {match.home}
          </span>
        </div>
        
        <div className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-md min-w-[60px] justify-center">
          <span className={`text-sm font-bold tabular-nums ${homeWin ? "" : "text-muted-foreground"}`}>
            {match.homeScore}
          </span>
          <span className="text-muted-foreground text-xs">-</span>
          <span className={`text-sm font-bold tabular-nums ${awayWin ? "" : "text-muted-foreground"}`}>
            {match.awayScore}
          </span>
        </div>
        
        <div className="flex flex-col items-start flex-1">
          <span className={`text-sm ${awayWin ? "font-bold" : "font-medium text-muted-foreground"}`}>
            {match.away}
          </span>
        </div>
      </div>
      
      <div className="text-right ml-4">
        <div className={`text-2xs font-bold ${
          match.status === "LIVE" ? "text-destructive" : 
          match.status === "HT" ? "text-primary" : "text-muted-foreground"
        }`}>
          {match.status}
        </div>
        <div className="text-2xs text-muted-foreground">{match.date}</div>
      </div>
    </div>
  );
}

export function RecentMatches() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="section-header flex items-center justify-between">
        <div>
          <h2 className="section-title">Results</h2>
          <p className="section-subtitle">Recent matches</p>
        </div>
        <button className="text-2xs font-bold text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          VIEW ALL →
        </button>
      </div>
      <div className="divide-y divide-border">
        {matches.map((match, i) => (
          <MatchRow key={i} match={match} />
        ))}
      </div>
    </div>
  );
}
