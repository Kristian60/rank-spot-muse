interface Athlete {
  rank: number;
  name: string;
  country: string;
  flag: string;
  points: number;
}

const menAthletes: Athlete[] = [
  { rank: 1, name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦", points: 1245 },
  { rank: 2, name: "James Sprague", country: "USA", flag: "🇺🇸", points: 1198 },
  { rank: 3, name: "Brent Fikowski", country: "CAN", flag: "🇨🇦", points: 1156 },
  { rank: 4, name: "Dallin Pepper", country: "USA", flag: "🇺🇸", points: 1089 },
  { rank: 5, name: "Patrick Vellner", country: "CAN", flag: "🇨🇦", points: 1045 },
  { rank: 6, name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺", points: 987 },
  { rank: 7, name: "Lazar Đukić", country: "SRB", flag: "🇷🇸", points: 945 },
  { rank: 8, name: "Jonne Koski", country: "FIN", flag: "🇫🇮", points: 912 },
  { rank: 9, name: "Björgvin Karl Guðmundsson", country: "ISL", flag: "🇮🇸", points: 876 },
  { rank: 10, name: "Ricky Garard", country: "AUS", flag: "🇦🇺", points: 854 },
];

const womenAthletes: Athlete[] = [
  { rank: 1, name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺", points: 1456 },
  { rank: 2, name: "Laura Horvath", country: "HUN", flag: "🇭🇺", points: 1287 },
  { rank: 3, name: "Emma Lawson", country: "CAN", flag: "🇨🇦", points: 1198 },
  { rank: 4, name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 1134 },
  { rank: 5, name: "Gabriela Migała", country: "POL", flag: "🇵🇱", points: 1089 },
  { rank: 6, name: "Danielle Brandon", country: "USA", flag: "🇺🇸", points: 1023 },
  { rank: 7, name: "Alexis Raptis", country: "USA", flag: "🇺🇸", points: 987 },
  { rank: 8, name: "Brooke Wells", country: "USA", flag: "🇺🇸", points: 945 },
  { rank: 9, name: "Emma Tall", country: "SWE", flag: "🇸🇪", points: 912 },
  { rank: 10, name: "Bethany Flores", country: "USA", flag: "🇺🇸", points: 878 },
];

function AthleteTable({ athletes, title }: { athletes: Athlete[]; title: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      <table className="standings-table w-full">
        <thead>
          <tr>
            <th className="w-10 text-left">#</th>
            <th className="text-left">Athlete</th>
            <th className="w-20 text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.rank}>
              <td className="text-left font-medium text-muted-foreground">{athlete.rank}</td>
              <td className="text-left">
                <span className="mr-2">{athlete.flag}</span>
                <span className="font-medium text-foreground hover:text-muted-foreground cursor-pointer transition-colors">
                  {athlete.name}
                </span>
              </td>
              <td className="text-right font-semibold text-foreground tabular-nums">{athlete.points}</td>
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
      <div className="mb-10">
        <h2 className="section-header">World Rankings</h2>
        <p className="section-subheader">Top 10 athletes globally</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AthleteTable athletes={menAthletes} title="Men" />
        <AthleteTable athletes={womenAthletes} title="Women" />
      </div>
    </div>
  );
}
