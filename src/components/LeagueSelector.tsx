const leagues = [
  { code: "PL", name: "Premier League", country: "England", active: true },
  { code: "LL", name: "La Liga", country: "Spain", active: false },
  { code: "SA", name: "Serie A", country: "Italy", active: false },
  { code: "BL", name: "Bundesliga", country: "Germany", active: false },
  { code: "L1", name: "Ligue 1", country: "France", active: false },
];

export function LeagueSelector() {
  return (
    <div className="border border-border rounded overflow-hidden">
      <div className="bg-secondary px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">Leagues</h2>
      </div>
      <div className="divide-y divide-border">
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors ${
              league.active ? "bg-muted" : ""
            }`}
          >
            <div>
              <div className={`text-sm ${league.active ? "font-semibold" : ""}`}>{league.name}</div>
              <div className="text-2xs text-muted-foreground">{league.country}</div>
            </div>
            <span className="text-2xs text-muted-foreground font-mono">{league.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
