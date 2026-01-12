import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface TeamRanking {
  rank: number;
  change: number;
  team: string;
  abbr: string;
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
  { rank: 1, change: 0, team: "Manchester City", abbr: "MCI", played: 26, wins: 18, draws: 4, losses: 4, gf: 56, ga: 24, gd: 32, points: 58, form: ["W", "W", "D", "W", "W"] },
  { rank: 2, change: 1, team: "Arsenal", abbr: "ARS", played: 26, wins: 17, draws: 5, losses: 4, gf: 54, ga: 26, gd: 28, points: 56, form: ["W", "W", "W", "L", "W"] },
  { rank: 3, change: -1, team: "Liverpool", abbr: "LIV", played: 26, wins: 16, draws: 7, losses: 3, gf: 52, ga: 28, gd: 24, points: 55, form: ["D", "W", "W", "W", "D"] },
  { rank: 4, change: 2, team: "Aston Villa", abbr: "AVL", played: 26, wins: 15, draws: 5, losses: 6, gf: 52, ga: 38, gd: 14, points: 50, form: ["W", "L", "W", "W", "W"] },
  { rank: 5, change: 0, team: "Tottenham", abbr: "TOT", played: 26, wins: 14, draws: 4, losses: 8, gf: 52, ga: 42, gd: 10, points: 46, form: ["L", "W", "W", "D", "W"] },
  { rank: 6, change: -2, team: "Chelsea", abbr: "CHE", played: 26, wins: 12, draws: 7, losses: 7, gf: 52, ga: 42, gd: 10, points: 43, form: ["D", "D", "W", "L", "W"] },
  { rank: 7, change: 1, team: "Newcastle", abbr: "NEW", played: 26, wins: 12, draws: 5, losses: 9, gf: 56, ga: 42, gd: 14, points: 41, form: ["W", "W", "L", "W", "L"] },
  { rank: 8, change: -1, team: "Manchester United", abbr: "MUN", played: 26, wins: 12, draws: 4, losses: 10, gf: 36, ga: 38, gd: -2, points: 40, form: ["L", "D", "W", "L", "W"] },
  { rank: 9, change: 0, team: "West Ham", abbr: "WHU", played: 26, wins: 10, draws: 7, losses: 9, gf: 42, ga: 52, gd: -10, points: 37, form: ["L", "L", "D", "W", "D"] },
  { rank: 10, change: 3, team: "Brighton", abbr: "BHA", played: 26, wins: 9, draws: 9, losses: 8, gf: 46, ga: 46, gd: 0, points: 36, form: ["W", "W", "W", "D", "W"] },
  { rank: 11, change: -1, team: "Bournemouth", abbr: "BOU", played: 26, wins: 10, draws: 6, losses: 10, gf: 42, ga: 50, gd: -8, points: 36, form: ["D", "L", "W", "D", "L"] },
  { rank: 12, change: 0, team: "Crystal Palace", abbr: "CRY", played: 26, wins: 8, draws: 8, losses: 10, gf: 36, ga: 44, gd: -8, points: 32, form: ["W", "L", "L", "W", "D"] },
];

function RankChange({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="rank-change-up flex items-center justify-center gap-0.5 text-xs font-bold">
        <ChevronUp className="h-3.5 w-3.5" />
        <span className="text-2xs">{change}</span>
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="rank-change-down flex items-center justify-center gap-0.5 text-xs font-bold">
        <ChevronDown className="h-3.5 w-3.5" />
        <span className="text-2xs">{Math.abs(change)}</span>
      </span>
    );
  }
  return (
    <span className="rank-change-neutral flex items-center justify-center text-xs">
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
          className={`w-5 h-5 flex items-center justify-center text-2xs font-bold rounded ${
            result === "W"
              ? "bg-success text-success-foreground"
              : result === "L"
              ? "bg-destructive text-destructive-foreground"
              : "bg-muted-foreground/30 text-foreground"
          }`}
        >
          {result}
        </span>
      ))}
    </div>
  );
}

function TeamCell({ team, abbr }: { team: string; abbr: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
        <span className="text-2xs font-bold text-muted-foreground">{abbr.slice(0, 2)}</span>
      </div>
      <span className="font-semibold">{team}</span>
    </div>
  );
}

export function RankingsTable() {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
      <div className="section-header flex items-center justify-between">
        <div>
          <h2 className="section-title">Premier League Standings</h2>
          <p className="section-subtitle">2024-25 Season · Matchday 26</p>
        </div>
        <div className="text-xs font-medium text-primary-foreground/80">
          Updated Jan 12
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-10 text-center">#</th>
              <th className="w-10 text-center">+/-</th>
              <th className="min-w-[180px]">TEAM</th>
              <th className="text-center w-10">GP</th>
              <th className="text-center w-10">W</th>
              <th className="text-center w-10">D</th>
              <th className="text-center w-10">L</th>
              <th className="text-center w-10">GF</th>
              <th className="text-center w-10">GA</th>
              <th className="text-center w-12">DIFF</th>
              <th className="text-center w-12">PTS</th>
              <th className="min-w-[120px]">FORM</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((team, index) => (
              <tr 
                key={team.rank}
                className={index < 4 ? "border-l-2 border-l-success" : index >= 10 ? "border-l-2 border-l-destructive/50" : ""}
              >
                <td className="text-center font-bold text-base">{team.rank}</td>
                <td className="text-center">
                  <RankChange change={team.change} />
                </td>
                <td>
                  <TeamCell team={team.team} abbr={team.abbr} />
                </td>
                <td className="text-center text-muted-foreground">{team.played}</td>
                <td className="text-center stat-highlight">{team.wins}</td>
                <td className="text-center">{team.draws}</td>
                <td className="text-center">{team.losses}</td>
                <td className="text-center">{team.gf}</td>
                <td className="text-center">{team.ga}</td>
                <td className={`text-center font-bold ${team.gd > 0 ? "text-success" : team.gd < 0 ? "text-destructive" : ""}`}>
                  {team.gd > 0 ? "+" : ""}{team.gd}
                </td>
                <td className="text-center stat-highlight text-base">{team.points}</td>
                <td>
                  <FormIndicator form={team.form} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 bg-muted/50 border-t border-border text-2xs text-muted-foreground flex gap-6">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success" /> Champions League
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-destructive/50" /> Relegation Zone
        </span>
      </div>
    </div>
  );
}
