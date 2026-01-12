import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "W1", team1: 3, team2: 3, team3: 1 },
  { week: "W2", team1: 6, team2: 4, team3: 4 },
  { week: "W3", team1: 7, team2: 7, team3: 7 },
  { week: "W4", team1: 10, team2: 10, team3: 8 },
  { week: "W5", team1: 13, team2: 11, team3: 11 },
  { week: "W6", team1: 16, team2: 14, team3: 12 },
  { week: "W7", team1: 19, team2: 17, team3: 15 },
  { week: "W8", team1: 22, team2: 18, team3: 18 },
  { week: "W9", team1: 22, team2: 21, team3: 19 },
  { week: "W10", team1: 25, team2: 24, team3: 20 },
  { week: "W11", team1: 28, team2: 25, team3: 23 },
  { week: "W12", team1: 31, team2: 28, team3: 24 },
];

const teams = [
  { key: "team1", name: "Man City", color: "hsl(var(--primary))" },
  { key: "team2", name: "Arsenal", color: "hsl(var(--destructive))" },
  { key: "team3", name: "Liverpool", color: "hsl(var(--success))" },
];

export function PerformanceChart() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="section-header">
        <h2 className="section-title">Points Race</h2>
        <p className="section-subtitle">Top 3 teams · Last 12 weeks</p>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-4 mb-4">
          {teams.map((team) => (
            <div key={team.key} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-1 rounded-full" 
                style={{ backgroundColor: team.color }}
              />
              <span className="font-medium">{team.name}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            {teams.map((team) => (
              <Line 
                key={team.key}
                type="monotone" 
                dataKey={team.key} 
                stroke={team.color}
                strokeWidth={2.5}
                dot={false}
                name={team.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
