import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface TeamRanking {
  rank: number;
  change: number;
  team: string;
  country: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: string[];
}

const rankings: TeamRanking[] = [
  { rank: 1, change: 0, team: "Manchester City", country: "ENG", played: 38, wins: 28, draws: 5, losses: 5, gf: 94, ga: 33, gd: 61, points: 89, form: ["W", "W", "D", "W", "W"] },
  { rank: 2, change: 1, team: "Arsenal", country: "ENG", played: 38, wins: 26, draws: 6, losses: 6, gf: 88, ga: 43, gd: 45, points: 84, form: ["W", "W", "W", "L", "W"] },
  { rank: 3, change: -1, team: "Liverpool", country: "ENG", played: 38, wins: 24, draws: 10, losses: 4, gf: 85, ga: 41, gd: 44, points: 82, form: ["D", "W", "W", "W", "D"] },
  { rank: 4, change: 2, team: "Aston Villa", country: "ENG", played: 38, wins: 20, draws: 8, losses: 10, gf: 76, ga: 61, gd: 15, points: 68, form: ["W", "L", "W", "W", "W"] },
  { rank: 5, change: 0, team: "Tottenham", country: "ENG", played: 38, wins: 20, draws: 6, losses: 12, gf: 74, ga: 61, gd: 13, points: 66, form: ["L", "W", "W", "D", "W"] },
  { rank: 6, change: -2, team: "Chelsea", country: "ENG", played: 38, wins: 18, draws: 9, losses: 11, gf: 77, ga: 63, gd: 14, points: 63, form: ["D", "D", "W", "L", "W"] },
  { rank: 7, change: 1, team: "Newcastle", country: "ENG", played: 38, wins: 18, draws: 6, losses: 14, gf: 85, ga: 62, gd: 23, points: 60, form: ["W", "W", "L", "W", "L"] },
  { rank: 8, change: -1, team: "Manchester United", country: "ENG", played: 38, wins: 18, draws: 6, losses: 14, gf: 57, ga: 58, gd: -1, points: 60, form: ["L", "D", "W", "L", "W"] },
  { rank: 9, change: 0, team: "West Ham", country: "ENG", played: 38, wins: 14, draws: 10, losses: 14, gf: 60, ga: 74, gd: -14, points: 52, form: ["L", "L", "D", "W", "D"] },
  { rank: 10, change: 3, team: "Crystal Palace", country: "ENG", played: 38, wins: 13, draws: 10, losses: 15, gf: 57, ga: 58, gd: -1, points: 49, form: ["W", "W", "W", "D", "W"] },
  { rank: 11, change: -1, team: "Brighton", country: "ENG", played: 38, wins: 12, draws: 12, losses: 14, gf: 55, ga: 62, gd: -7, points: 48, form: ["D", "L", "W", "D", "L"] },
  { rank: 12, change: 0, team: "Bournemouth", country: "ENG", played: 38, wins: 13, draws: 9, losses: 16, gf: 54, ga: 67, gd: -13, points: 48, form: ["W", "L", "L", "W", "D"] },
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
    <div className="flex gap-0.5">
      {form.map((result, i) => (
        <span
          key={i}
          className={`w-5 h-5 flex items-center justify-center text-xs font-medium ${
            result === "W"
              ? "bg-success text-success-foreground"
              : result === "L"
              ? "bg-destructive text-destructive-foreground"
              : "bg-muted text-muted-foreground"
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
    <div className="carbon-tile">
      <div className="carbon-tile-header flex items-center justify-between">
        <div>
          <h2 className="carbon-tile-title">Premier League Rankings</h2>
          <p className="carbon-tile-subtitle">2024-25 Season</p>
        </div>
        <span className="carbon-tag">Live</span>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12 text-center">#</th>
              <th className="w-10"></th>
              <th className="min-w-[160px]">Team</th>
              <th className="text-center">MP</th>
              <th className="text-center">W</th>
              <th className="text-center">D</th>
              <th className="text-center">L</th>
              <th className="text-center">GF</th>
              <th className="text-center">GA</th>
              <th className="text-center">GD</th>
              <th className="text-center">Pts</th>
              <th className="min-w-[100px]">Form</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((team) => (
              <tr key={team.rank}>
                <td className="text-center font-semibold">{team.rank}</td>
                <td className="text-center">
                  <RankChange change={team.change} />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary hover:underline cursor-pointer">{team.team}</span>
                    <span className="text-xs text-muted-foreground">{team.country}</span>
                  </div>
                </td>
                <td className="text-center">{team.played}</td>
                <td className="text-center stat-highlight">{team.wins}</td>
                <td className="text-center">{team.draws}</td>
                <td className="text-center">{team.losses}</td>
                <td className="text-center">{team.gf}</td>
                <td className="text-center">{team.ga}</td>
                <td className={`text-center font-medium ${team.gd > 0 ? "rank-change-up" : team.gd < 0 ? "rank-change-down" : ""}`}>
                  {team.gd > 0 ? "+" : ""}{team.gd}
                </td>
                <td className="text-center stat-highlight">{team.points}</td>
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
