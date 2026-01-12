interface Player {
  rank: number;
  name: string;
  team: string;
  goals: number;
  assists: number;
  matches: number;
  mins: number;
}

const players: Player[] = [
  { rank: 1, name: "E. Haaland", team: "Man City", goals: 21, assists: 5, matches: 24, mins: 2047 },
  { rank: 2, name: "C. Palmer", team: "Chelsea", goals: 16, assists: 8, matches: 26, mins: 2284 },
  { rank: 3, name: "A. Isak", team: "Newcastle", goals: 15, assists: 3, matches: 25, mins: 2156 },
  { rank: 4, name: "M. Salah", team: "Liverpool", goals: 14, assists: 11, matches: 24, mins: 2112 },
  { rank: 5, name: "B. Saka", team: "Arsenal", goals: 13, assists: 9, matches: 25, mins: 2198 },
  { rank: 6, name: "O. Watkins", team: "Aston Villa", goals: 12, assists: 7, matches: 26, mins: 2340 },
  { rank: 7, name: "J. Solanke", team: "Tottenham", goals: 11, assists: 4, matches: 23, mins: 1890 },
  { rank: 8, name: "H. Son", team: "Tottenham", goals: 10, assists: 6, matches: 24, mins: 2016 },
];

export function TopScorers() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="section-header">Top Scorers</h2>
        <p className="section-subheader">Leading goal scorers this season</p>
      </div>
      <table className="standings-table">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th className="min-w-[160px]">Player</th>
            <th>Team</th>
            <th>G</th>
            <th>A</th>
            <th>MP</th>
            <th>Mins</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank}>
              <td className="text-center font-medium text-foreground">{player.rank}</td>
              <td className="text-left font-medium text-foreground hover:text-muted-foreground cursor-pointer transition-colors">
                {player.name}
              </td>
              <td className="text-left text-muted-foreground">{player.team}</td>
              <td className="stat-highlight">{player.goals}</td>
              <td>{player.assists}</td>
              <td className="text-muted-foreground">{player.matches}</td>
              <td className="text-muted-foreground">{player.mins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
