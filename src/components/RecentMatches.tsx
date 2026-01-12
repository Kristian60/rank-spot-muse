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
    <div>
      <div className="mb-5">
        <h2 className="section-header">Recent Matches</h2>
        <p className="section-subheader">Latest results</p>
      </div>
      <div className="space-y-0">
        {matches.map((match, i) => (
          <div key={i} className="py-3 flex items-center border-b border-border last:border-0">
            <span className="text-xs text-muted-foreground w-14">{match.date}</span>
            <div className="flex-1 flex items-center justify-center gap-4">
              <span className={`text-sm text-right flex-1 ${match.homeScore > match.awayScore ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {match.home}
              </span>
              <div className="flex items-center tabular-nums font-semibold text-base">
                <span className={`w-6 text-center ${match.homeScore > match.awayScore ? "text-foreground" : "text-muted-foreground"}`}>
                  {match.homeScore}
                </span>
                <span className="text-muted-foreground mx-2">–</span>
                <span className={`w-6 text-center ${match.awayScore > match.homeScore ? "text-foreground" : "text-muted-foreground"}`}>
                  {match.awayScore}
                </span>
              </div>
              <span className={`text-sm text-left flex-1 ${match.awayScore > match.homeScore ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {match.away}
              </span>
            </div>
            <span className="chip">{match.competition}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
