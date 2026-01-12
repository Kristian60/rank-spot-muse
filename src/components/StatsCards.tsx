import { Target, Shield, Calendar, AlertTriangle } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  detail?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

const stats: Stat[] = [
  { 
    label: "Goals Scored", 
    value: 847, 
    detail: "Avg 2.78 per match",
    icon: <Target className="h-5 w-5" />,
    trend: "up"
  },
  { 
    label: "Clean Sheets", 
    value: 89, 
    detail: "23.4% of matches",
    icon: <Shield className="h-5 w-5" />,
    trend: "neutral"
  },
  { 
    label: "Matches Played", 
    value: 304, 
    detail: "76 remaining",
    icon: <Calendar className="h-5 w-5" />,
    trend: "neutral"
  },
  { 
    label: "Cards Issued", 
    value: 612, 
    detail: "56 red · 556 yellow",
    icon: <AlertTriangle className="h-5 w-5" />,
    trend: "down"
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {stat.icon}
            </div>
            {stat.trend && (
              <span className={`text-2xs font-bold uppercase ${
                stat.trend === "up" ? "text-success" : 
                stat.trend === "down" ? "text-destructive" : "text-muted-foreground"
              }`}>
                {stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "–"}
              </span>
            )}
          </div>
          <div className="text-2xl font-black tabular-nums tracking-tight">{stat.value}</div>
          <div className="text-xs font-semibold text-foreground/80 mt-1">{stat.label}</div>
          {stat.detail && (
            <div className="text-2xs text-muted-foreground mt-1">{stat.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}
