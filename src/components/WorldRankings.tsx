import { Link } from "react-router-dom";

interface Athlete {
  id: string;
  rank: number;
  name: string;
  country: string;
  flag: string;
  points: number;
}

const menAthletes: Athlete[] = [
  { id: "1001", rank: 1, name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦", points: 1245 },
  { id: "1002", rank: 2, name: "James Sprague", country: "USA", flag: "🇺🇸", points: 1198 },
  { id: "1003", rank: 3, name: "Brent Fikowski", country: "CAN", flag: "🇨🇦", points: 1156 },
  { id: "1004", rank: 4, name: "Dallin Pepper", country: "USA", flag: "🇺🇸", points: 1089 },
  { id: "1005", rank: 5, name: "Patrick Vellner", country: "CAN", flag: "🇨🇦", points: 1045 },
  { id: "1006", rank: 6, name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺", points: 987 },
  { id: "1007", rank: 7, name: "Lazar Đukić", country: "SRB", flag: "🇷🇸", points: 945 },
  { id: "1008", rank: 8, name: "Jonne Koski", country: "FIN", flag: "🇫🇮", points: 912 },
  { id: "1009", rank: 9, name: "Björgvin Karl Guðmundsson", country: "ISL", flag: "🇮🇸", points: 876 },
  { id: "1010", rank: 10, name: "Ricky Garard", country: "AUS", flag: "🇦🇺", points: 854 },
];

const womenAthletes: Athlete[] = [
  { id: "2001", rank: 1, name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺", points: 1456 },
  { id: "3638", rank: 2, name: "Laura Horvath", country: "HUN", flag: "🇭🇺", points: 1287 },
  { id: "2003", rank: 3, name: "Emma Lawson", country: "CAN", flag: "🇨🇦", points: 1198 },
  { id: "2004", rank: 4, name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 1134 },
  { id: "2005", rank: 5, name: "Gabriela Migała", country: "POL", flag: "🇵🇱", points: 1089 },
  { id: "2006", rank: 6, name: "Danielle Brandon", country: "USA", flag: "🇺🇸", points: 1023 },
  { id: "2007", rank: 7, name: "Alexis Raptis", country: "USA", flag: "🇺🇸", points: 987 },
  { id: "2008", rank: 8, name: "Brooke Wells", country: "USA", flag: "🇺🇸", points: 945 },
  { id: "2009", rank: 9, name: "Emma Tall", country: "SWE", flag: "🇸🇪", points: 912 },
  { id: "2010", rank: 10, name: "Bethany Flores", country: "USA", flag: "🇺🇸", points: 878 },
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
                <Link
                  to={`/athlete/${athlete.id}`}
                  className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {athlete.name}
                </Link>
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
