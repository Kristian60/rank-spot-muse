interface Player {
  rank: number;
  name: string;
  team: string;
  teamAbbr: string;
  goals: number;
  assists: number;
  matches: number;
  minsPerGoal: number;
}

const players: Player[] = [
  { rank: 1, name: "Erling Haaland", team: "Manchester City", teamAbbr: "MCI", goals: 21, assists: 5, matches: 24, minsPerGoal: 97 },
  { rank: 2, name: "Cole Palmer", team: "Chelsea", teamAbbr: "CHE", goals: 16, assists: 8, matches: 26, minsPerGoal: 143 },
  { rank: 3, name: "Alexander Isak", team: "Newcastle", teamAbbr: "NEW", goals: 15, assists: 3, matches: 25, minsPerGoal: 144 },
  { rank: 4, name: "Mohamed Salah", team: "Liverpool", teamAbbr: "LIV", goals: 14, assists: 11, matches: 24, minsPerGoal: 151 },
  { rank: 5, name: "Bukayo Saka", team: "Arsenal", teamAbbr: "ARS", goals: 13, assists: 9, matches: 25, minsPerGoal: 169 },
  { rank: 6, name: "Ollie Watkins", team: "Aston Villa", teamAbbr: "AVL", goals: 12, assists: 7, matches: 26, minsPerGoal: 195 },
];

export function TopScorers() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="section-header flex items-center justify-between">
        <div>
          <h2 className="section-title">Top Scorers</h2>
          <p className="section-subtitle">Golden Boot race</p>
        </div>
        <button className="text-2xs font-bold text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          FULL STATS →
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th className="w-10 text-center">#</th>
            <th>PLAYER</th>
            <th className="hidden sm:table-cell">TEAM</th>
            <th className="text-center w-12">G</th>
            <th className="text-center w-12">A</th>
            <th className="text-center w-12">GP</th>
            <th className="text-center w-16 hidden sm:table-cell">MIN/G</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank} className="cursor-pointer">
              <td className="text-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                  player.rank === 1 ? "bg-primary text-primary-foreground" :
                  player.rank <= 3 ? "bg-muted text-muted-foreground" : ""
                }`}>
                  {player.rank}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-2xs font-bold text-muted-foreground">
                      {player.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{player.name}</div>
                    <div className="text-2xs text-muted-foreground sm:hidden">{player.teamAbbr}</div>
                  </div>
                </div>
              </td>
              <td className="text-muted-foreground hidden sm:table-cell">{player.team}</td>
              <td className="text-center">
                <span className="font-bold text-base">{player.goals}</span>
              </td>
              <td className="text-center text-muted-foreground">{player.assists}</td>
              <td className="text-center text-muted-foreground">{player.matches}</td>
              <td className="text-center text-muted-foreground hidden sm:table-cell">{player.minsPerGoal}'</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
