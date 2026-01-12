const leagues = [
  { code: "PL", name: "Premier League", country: "England", active: true },
  { code: "LL", name: "La Liga", country: "Spain", active: false },
  { code: "SA", name: "Serie A", country: "Italy", active: false },
  { code: "BL", name: "Bundesliga", country: "Germany", active: false },
  { code: "L1", name: "Ligue 1", country: "France", active: false },
];

export function LeagueSelector() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="section-header">
        <h2 className="section-title">Leagues</h2>
      </div>
      <div className="p-1">
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`w-full px-3 py-2.5 text-left flex items-center justify-between rounded-md transition-colors ${
              league.active 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-2xs font-bold ${
                league.active 
                  ? "bg-primary-foreground/20 text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {league.code}
              </div>
              <div>
                <div className={`text-sm font-semibold ${league.active ? "" : ""}`}>{league.name}</div>
                <div className={`text-2xs ${league.active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {league.country}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
