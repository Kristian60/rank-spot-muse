const leagues = [
  { code: "PL", name: "Premier League", country: "England", active: true },
  { code: "LL", name: "La Liga", country: "Spain", active: false },
  { code: "SA", name: "Serie A", country: "Italy", active: false },
  { code: "BL", name: "Bundesliga", country: "Germany", active: false },
  { code: "L1", name: "Ligue 1", country: "France", active: false },
];

export function LeagueSelector() {
  return (
    <div className="carbon-tile">
      <div className="carbon-tile-header">
        <h2 className="carbon-tile-title">Leagues</h2>
      </div>
      <div>
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors duration-100 border-b border-border ${
              league.active 
                ? "bg-primary/10 border-l-2 border-l-primary" 
                : "hover:bg-field border-l-2 border-l-transparent"
            }`}
          >
            <div>
              <div className={`text-sm ${league.active ? "text-primary font-medium" : ""}`}>{league.name}</div>
              <div className="text-xs text-muted-foreground">{league.country}</div>
            </div>
            <span className="text-xs text-muted-foreground font-mono">{league.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
