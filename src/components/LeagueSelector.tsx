const leagues = [
  { code: "PL", name: "Premier League", country: "England", active: true },
  { code: "LL", name: "La Liga", country: "Spain", active: false },
  { code: "SA", name: "Serie A", country: "Italy", active: false },
  { code: "BL", name: "Bundesliga", country: "Germany", active: false },
  { code: "L1", name: "Ligue 1", country: "France", active: false },
];

export function LeagueSelector() {
  return (
    <div className="material-card">
      <div className="material-card-header">
        <h2 className="material-card-title">Leagues</h2>
      </div>
      <div className="py-1">
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors duration-200 ${
              league.active 
                ? "bg-primary/10 text-primary border-l-2 border-primary" 
                : "hover:bg-secondary border-l-2 border-transparent"
            }`}
          >
            <div>
              <div className={`text-sm ${league.active ? "font-medium" : ""}`}>{league.name}</div>
              <div className="text-xs text-muted-foreground">{league.country}</div>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{league.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
