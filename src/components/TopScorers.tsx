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
    <div className="carbon-tile">
      <div className="carbon-tile-header">
        <h2 className="carbon-tile-title">Top Scorers</h2>
        <p className="carbon-tile-subtitle">Leading goal scorers</p>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th className="w-8 text-center">#</th>
            <th>Player</th>
            <th>Team</th>
            <th className="text-center">G</th>
            <th className="text-center">A</th>
            <th className="text-center">MP</th>
            <th className="text-center">Mins</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank}>
              <td className="text-center font-semibold">{player.rank}</td>
              <td className="font-medium text-primary hover:underline cursor-pointer">{player.name}</td>
              <td className="text-muted-foreground">{player.team}</td>
              <td className="text-center stat-highlight">{player.goals}</td>
              <td className="text-center">{player.assists}</td>
              <td className="text-center">{player.matches}</td>
              <td className="text-center text-muted-foreground font-mono">{player.mins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
