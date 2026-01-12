interface Match {
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  date: string;
  competition: string;
}

const matches: Match[] = [
  { home: "Arsenal", away: "Chelsea", homeScore: 3, awayScore: 1, date: "Jan 12", competition: "PL" },
  { home: "Liverpool", away: "Man United", homeScore: 2, awayScore: 2, date: "Jan 12", competition: "PL" },
  { home: "Man City", away: "Tottenham", homeScore: 4, awayScore: 0, date: "Jan 11", competition: "PL" },
  { home: "Newcastle", away: "Brighton", homeScore: 1, awayScore: 0, date: "Jan 11", competition: "PL" },
  { home: "Aston Villa", away: "West Ham", homeScore: 2, awayScore: 1, date: "Jan 11", competition: "PL" },
  { home: "Bournemouth", away: "Crystal Palace", homeScore: 0, awayScore: 3, date: "Jan 10", competition: "PL" },
];

export function RecentMatches() {
  return (
    <div className="border border-border rounded overflow-hidden">
      <div className="bg-secondary px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">Recent Matches</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Latest results</p>
      </div>
      <div className="divide-y divide-border">
        {matches.map((match, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center hover:bg-muted/50 transition-colors">
            <span className="text-2xs text-muted-foreground w-12">{match.date}</span>
            <div className="flex-1 flex items-center justify-center gap-3">
              <span className={`text-sm text-right flex-1 ${match.homeScore > match.awayScore ? "font-semibold" : ""}`}>
                {match.home}
              </span>
              <div className="flex items-center gap-1.5 tabular-nums font-semibold text-sm">
                <span className={match.homeScore > match.awayScore ? "" : "text-muted-foreground"}>
                  {match.homeScore}
                </span>
                <span className="text-muted-foreground">-</span>
                <span className={match.awayScore > match.homeScore ? "" : "text-muted-foreground"}>
                  {match.awayScore}
                </span>
              </div>
              <span className={`text-sm text-left flex-1 ${match.awayScore > match.homeScore ? "font-semibold" : ""}`}>
                {match.away}
              </span>
            </div>
            <span className="text-2xs text-muted-foreground w-8 text-right">{match.competition}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
