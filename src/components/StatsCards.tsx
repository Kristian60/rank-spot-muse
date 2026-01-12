interface Stat {
  label: string;
  value: string | number;
  detail?: string;
}

const stats: Stat[] = [
  { label: "Goals Scored", value: 847, detail: "Avg 2.8 per match" },
  { label: "Clean Sheets", value: 89, detail: "23.4% of matches" },
  { label: "Total Matches", value: 304, detail: "38 remaining" },
  { label: "Cards Issued", value: 612, detail: "56 red, 556 yellow" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card p-4 hover:bg-field transition-colors duration-100">
          <div className="text-xs text-muted-foreground mb-1">
            {stat.label}
          </div>
          <div className="text-2xl font-semibold tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {stat.value}
          </div>
          {stat.detail && (
            <div className="text-xs text-muted-foreground mt-2">{stat.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}
