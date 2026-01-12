const leagues = [
  { code: "PL", name: "Premier League", country: "England", active: true },
  { code: "LL", name: "La Liga", country: "Spain", active: false },
  { code: "SA", name: "Serie A", country: "Italy", active: false },
  { code: "BL", name: "Bundesliga", country: "Germany", active: false },
  { code: "L1", name: "Ligue 1", country: "France", active: false },
];

export function LeagueSelector() {
  return (
    <div className="mat-card-elevated overflow-hidden">
      <div className="mat-card-header">
        <h2 className="text-sm font-medium text-foreground">Leagues</h2>
      </div>
      <div>
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`w-full px-5 py-4 text-left flex items-center justify-between transition-colors duration-150 border-b border-border last:border-0 ${
              league.active 
                ? "bg-primary/5" 
                : "hover:bg-secondary"
            }`}
          >
            <div>
              <div className={`text-sm font-medium ${league.active ? "text-primary" : "text-foreground"}`}>
                {league.name}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{league.country}</div>
            </div>
            <span className={`mat-chip ${league.active ? "mat-chip-primary" : ""}`}>
              {league.code}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
