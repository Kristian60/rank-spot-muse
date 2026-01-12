import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface TeamRanking {
  rank: number;
  change: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: string[];
  streak: string;
}

const rankings: TeamRanking[] = [
  { rank: 1, change: 0, team: "Manchester City", played: 38, wins: 28, draws: 5, losses: 5, gf: 94, ga: 33, gd: 61, points: 89, form: ["W", "W", "D", "W", "W"], streak: "W4" },
  { rank: 2, change: 1, team: "Arsenal", played: 38, wins: 26, draws: 6, losses: 6, gf: 88, ga: 43, gd: 45, points: 84, form: ["W", "W", "W", "L", "W"], streak: "W2" },
  { rank: 3, change: -1, team: "Liverpool", played: 38, wins: 24, draws: 10, losses: 4, gf: 85, ga: 41, gd: 44, points: 82, form: ["D", "W", "W", "W", "D"], streak: "D1" },
  { rank: 4, change: 2, team: "Aston Villa", played: 38, wins: 20, draws: 8, losses: 10, gf: 76, ga: 61, gd: 15, points: 68, form: ["W", "L", "W", "W", "W"], streak: "W3" },
  { rank: 5, change: 0, team: "Tottenham", played: 38, wins: 20, draws: 6, losses: 12, gf: 74, ga: 61, gd: 13, points: 66, form: ["L", "W", "W", "D", "W"], streak: "W1" },
  { rank: 6, change: -2, team: "Chelsea", played: 38, wins: 18, draws: 9, losses: 11, gf: 77, ga: 63, gd: 14, points: 63, form: ["D", "D", "W", "L", "W"], streak: "W1" },
  { rank: 7, change: 1, team: "Newcastle", played: 38, wins: 18, draws: 6, losses: 14, gf: 85, ga: 62, gd: 23, points: 60, form: ["W", "W", "L", "W", "L"], streak: "L1" },
  { rank: 8, change: -1, team: "Manchester United", played: 38, wins: 18, draws: 6, losses: 14, gf: 57, ga: 58, gd: -1, points: 60, form: ["L", "D", "W", "L", "W"], streak: "W1" },
  { rank: 9, change: 0, team: "West Ham", played: 38, wins: 14, draws: 10, losses: 14, gf: 60, ga: 74, gd: -14, points: 52, form: ["L", "L", "D", "W", "D"], streak: "D1" },
  { rank: 10, change: 3, team: "Crystal Palace", played: 38, wins: 13, draws: 10, losses: 15, gf: 57, ga: 58, gd: -1, points: 49, form: ["W", "W", "W", "D", "W"], streak: "W1" },
  { rank: 11, change: -1, team: "Brighton", played: 38, wins: 12, draws: 12, losses: 14, gf: 55, ga: 62, gd: -7, points: 48, form: ["D", "L", "W", "D", "L"], streak: "L1" },
  { rank: 12, change: 0, team: "Bournemouth", played: 38, wins: 13, draws: 9, losses: 16, gf: 54, ga: 67, gd: -13, points: 48, form: ["W", "L", "L", "W", "D"], streak: "D1" },
];

function RankChange({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="rank-change-up flex items-center gap-0.5 text-xs">
        <ChevronUp className="h-3 w-3" />
        {change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="rank-change-down flex items-center gap-0.5 text-xs">
        <ChevronDown className="h-3 w-3" />
        {Math.abs(change)}
      </span>
    );
  }
  return (
    <span className="rank-change-neutral flex items-center text-xs">
      <Minus className="h-3 w-3" />
    </span>
  );
}

function FormIndicator({ form }: { form: string[] }) {
  return (
    <div className="flex gap-1">
      {form.map((result, i) => (
        <span
          key={i}
          className={`form-indicator ${
            result === "W"
              ? "form-win"
              : result === "L"
              ? "form-loss"
              : "form-draw"
          }`}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

export function RankingsTable() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-header">Premier League</h2>
          <p className="section-subheader">2024-25 Season Standings</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm font-medium text-foreground px-3 py-1.5 rounded-lg bg-secondary">Standard</button>
          <button className="text-sm text-muted-foreground px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors">Expanded</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="standings-table">
          <thead>
            <tr>
              <th className="w-16"></th>
              <th className="min-w-[200px]">Team</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>MP</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Pts</th>
              <th>STRK</th>
              <th className="min-w-[120px]">L5</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((team) => (
              <tr key={team.rank}>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{team.rank}</span>
                    <RankChange change={team.change} />
                  </div>
                </td>
                <td>
                  <span className="font-medium text-foreground hover:text-muted-foreground cursor-pointer transition-colors">
                    {team.team}
                  </span>
                </td>
                <td className="stat-highlight">{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td className="text-muted-foreground">{team.played}</td>
                <td>{team.gf}</td>
                <td>{team.ga}</td>
                <td className={team.gd > 0 ? "stat-positive" : team.gd < 0 ? "stat-negative" : ""}>
                  {team.gd > 0 ? "+" : ""}{team.gd}
                </td>
                <td className="font-semibold text-foreground">{team.points}</td>
                <td>
                  <span className={`text-sm font-medium ${
                    team.streak.startsWith("W") ? "text-success" : 
                    team.streak.startsWith("L") ? "text-destructive" : 
                    "text-muted-foreground"
                  }`}>
                    {team.streak}
                  </span>
                </td>
                <td>
                  <FormIndicator form={team.form} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
