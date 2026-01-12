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

export function PerformanceChart() {
  return (
    <div className="border border-border rounded overflow-hidden">
      <div className="bg-secondary px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">Points Progression</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Top 3 teams over 12 weeks</p>
      </div>
      <div className="p-4">
        <div className="flex gap-4 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-foreground" />
            <span>Man City</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-muted-foreground" />
            <span>Arsenal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-border" style={{ height: 2 }} />
            <span>Liverpool</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="team1" 
              stroke="hsl(var(--foreground))" 
              strokeWidth={2}
              dot={false}
              name="Man City"
            />
            <Line 
              type="monotone" 
              dataKey="team2" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              dot={false}
              name="Arsenal"
            />
            <Line 
              type="monotone" 
              dataKey="team3" 
              stroke="hsl(var(--border))" 
              strokeWidth={2}
              dot={false}
              name="Liverpool"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
