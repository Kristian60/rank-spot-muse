const leagues = [
  { code: "PL", name: "Premier League", country: "England", active: true },
  { code: "LL", name: "La Liga", country: "Spain", active: false },
  { code: "SA", name: "Serie A", country: "Italy", active: false },
  { code: "BL", name: "Bundesliga", country: "Germany", active: false },
  { code: "L1", name: "Ligue 1", country: "France", active: false },
];

export function LeagueSelector() {
  return (
    <div>
      <h2 className="text-sm font-medium text-foreground mb-3">Leagues</h2>
      <div className="space-y-1">
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`w-full px-3 py-2.5 text-left flex items-center justify-between rounded-lg transition-colors duration-100 ${
              league.active 
                ? "bg-secondary" 
                : "hover:bg-secondary"
            }`}
          >
            <div>
              <div className={`text-sm ${league.active ? "font-medium text-foreground" : "text-foreground"}`}>
                {league.name}
              </div>
              <div className="text-xs text-muted-foreground">{league.country}</div>
            </div>
            <span className="text-xs text-muted-foreground">
              {league.code}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
