interface Athlete {
  rank: number;
  name: string;
  country: string;
  flag: string;
  points: number;
  gamesAppearances: number;
  podiums: number;
  wins: number;
}

const menAthletes: Athlete[] = [
  { rank: 1, name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦", points: 1245, gamesAppearances: 6, podiums: 4, wins: 1 },
  { rank: 2, name: "James Sprague", country: "USA", flag: "🇺🇸", points: 1198, gamesAppearances: 3, podiums: 2, wins: 1 },
  { rank: 3, name: "Brent Fikowski", country: "CAN", flag: "🇨🇦", points: 1156, gamesAppearances: 8, podiums: 5, wins: 1 },
  { rank: 4, name: "Dallin Pepper", country: "USA", flag: "🇺🇸", points: 1089, gamesAppearances: 3, podiums: 2, wins: 0 },
  { rank: 5, name: "Patrick Vellner", country: "CAN", flag: "🇨🇦", points: 1045, gamesAppearances: 8, podiums: 4, wins: 1 },
  { rank: 6, name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺", points: 987, gamesAppearances: 4, podiums: 2, wins: 0 },
  { rank: 7, name: "Lazar Đukić", country: "SRB", flag: "🇷🇸", points: 945, gamesAppearances: 5, podiums: 1, wins: 0 },
  { rank: 8, name: "Jonne Koski", country: "FIN", flag: "🇫🇮", points: 912, gamesAppearances: 7, podiums: 2, wins: 0 },
  { rank: 9, name: "Björgvin Karl Guðmundsson", country: "ISL", flag: "🇮🇸", points: 876, gamesAppearances: 9, podiums: 3, wins: 0 },
  { rank: 10, name: "Ricky Garard", country: "AUS", flag: "🇦🇺", points: 854, gamesAppearances: 5, podiums: 2, wins: 0 },
];

const womenAthletes: Athlete[] = [
  { rank: 1, name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺", points: 1456, gamesAppearances: 9, podiums: 8, wins: 6 },
  { rank: 2, name: "Laura Horvath", country: "HUN", flag: "🇭🇺", points: 1287, gamesAppearances: 7, podiums: 5, wins: 1 },
  { rank: 3, name: "Emma Lawson", country: "CAN", flag: "🇨🇦", points: 1198, gamesAppearances: 2, podiums: 2, wins: 1 },
  { rank: 4, name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 1134, gamesAppearances: 5, podiums: 3, wins: 0 },
  { rank: 5, name: "Gabriela Migała", country: "POL", flag: "🇵🇱", points: 1089, gamesAppearances: 4, podiums: 2, wins: 0 },
  { rank: 6, name: "Danielle Brandon", country: "USA", flag: "🇺🇸", points: 1023, gamesAppearances: 5, podiums: 2, wins: 0 },
  { rank: 7, name: "Alexis Raptis", country: "USA", flag: "🇺🇸", points: 987, gamesAppearances: 3, podiums: 1, wins: 0 },
  { rank: 8, name: "Brooke Wells", country: "USA", flag: "🇺🇸", points: 945, gamesAppearances: 8, podiums: 2, wins: 0 },
  { rank: 9, name: "Emma Tall", country: "SWE", flag: "🇸🇪", points: 912, gamesAppearances: 4, podiums: 1, wins: 0 },
  { rank: 10, name: "Bethany Flores", country: "USA", flag: "🇺🇸", points: 878, gamesAppearances: 2, podiums: 1, wins: 0 },
];

function AthleteTable({ athletes, title }: { athletes: Athlete[]; title: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      <table className="standings-table">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th className="min-w-[180px]">Athlete</th>
            <th>Points</th>
            <th>Games</th>
            <th>Podiums</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.rank}>
              <td className="text-center font-medium text-foreground">{athlete.rank}</td>
              <td className="text-left">
                <span className="mr-2">{athlete.flag}</span>
                <span className="font-medium text-foreground hover:text-muted-foreground cursor-pointer transition-colors">
                  {athlete.name}
                </span>
              </td>
              <td className="font-semibold text-foreground">{athlete.points}</td>
              <td className="text-muted-foreground">{athlete.gamesAppearances}</td>
              <td>{athlete.podiums}</td>
              <td className={athlete.wins > 0 ? "font-medium text-foreground" : "text-muted-foreground"}>{athlete.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WorldRankings() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="section-header">World Rankings</h2>
        <p className="section-subheader">Top 10 athletes globally</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <AthleteTable athletes={menAthletes} title="Men" />
        <AthleteTable athletes={womenAthletes} title="Women" />
      </div>
    </div>
  );
}
