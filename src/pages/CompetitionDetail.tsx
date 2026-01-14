import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react";
import { Header } from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock competition data
const mockCompetition = {
  id: "rogue-2024",
  name: "Rogue Invitational 2024",
  date: "November 08-10, 2024",
  location: "Aberdeen, United Kingdom",
  flag: "🇬🇧",
  venue: "P&J Live Arena",
  totalAthletes: 80,
  prizePurse: "$2,500,000",
  divisions: ["Elite Men", "Elite Women", "Intermediate Men", "Intermediate Women", "Masters 35-39", "Masters 40-44"],
};

// Mock leaderboard data by division
const leaderboards: Record<string, Array<{
  rank: number;
  athleteId: string;
  name: string;
  country: string;
  flag: string;
  points: number;
  event1: number;
  event2: number;
  event3: number;
  event4: number;
}>> = {
  "Elite Men": [
    { rank: 1, athleteId: "1001", name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦", points: 580, event1: 1, event2: 2, event3: 1, event4: 3 },
    { rank: 2, athleteId: "1002", name: "James Sprague", country: "USA", flag: "🇺🇸", points: 545, event1: 3, event2: 1, event3: 4, event4: 1 },
    { rank: 3, athleteId: "1003", name: "Brent Fikowski", country: "CAN", flag: "🇨🇦", points: 520, event1: 2, event2: 5, event3: 2, event4: 2 },
    { rank: 4, athleteId: "1004", name: "Dallin Pepper", country: "USA", flag: "🇺🇸", points: 498, event1: 4, event2: 3, event3: 5, event4: 4 },
    { rank: 5, athleteId: "1005", name: "Patrick Vellner", country: "CAN", flag: "🇨🇦", points: 475, event1: 5, event2: 4, event3: 3, event4: 6 },
    { rank: 6, athleteId: "1006", name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺", points: 456, event1: 6, event2: 6, event3: 6, event4: 5 },
    { rank: 7, athleteId: "1007", name: "Lazar Đukić", country: "SRB", flag: "🇷🇸", points: 432, event1: 7, event2: 8, event3: 7, event4: 7 },
    { rank: 8, athleteId: "1008", name: "Jonne Koski", country: "FIN", flag: "🇫🇮", points: 410, event1: 8, event2: 7, event3: 9, event4: 8 },
  ],
  "Elite Women": [
    { rank: 1, athleteId: "2001", name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺", points: 600, event1: 1, event2: 1, event3: 1, event4: 1 },
    { rank: 2, athleteId: "3638", name: "Laura Horvath", country: "HUN", flag: "🇭🇺", points: 555, event1: 2, event2: 3, event3: 2, event4: 2 },
    { rank: 3, athleteId: "2003", name: "Emma Lawson", country: "CAN", flag: "🇨🇦", points: 528, event1: 3, event2: 2, event3: 4, event4: 3 },
    { rank: 4, athleteId: "2004", name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 502, event1: 4, event2: 4, event3: 3, event4: 5 },
    { rank: 5, athleteId: "2005", name: "Gabriela Migała", country: "POL", flag: "🇵🇱", points: 478, event1: 5, event2: 5, event3: 6, event4: 4 },
    { rank: 6, athleteId: "2006", name: "Danielle Brandon", country: "USA", flag: "🇺🇸", points: 445, event1: 6, event2: 7, event3: 5, event4: 6 },
    { rank: 7, athleteId: "2007", name: "Alexis Raptis", country: "USA", flag: "🇺🇸", points: 420, event1: 7, event2: 6, event3: 8, event4: 7 },
    { rank: 8, athleteId: "2008", name: "Brooke Wells", country: "USA", flag: "🇺🇸", points: 398, event1: 8, event2: 8, event3: 7, event4: 9 },
  ],
  "Intermediate Men": [
    { rank: 1, athleteId: "3001", name: "Marcus Chen", country: "USA", flag: "🇺🇸", points: 520, event1: 1, event2: 2, event3: 1, event4: 2 },
    { rank: 2, athleteId: "3002", name: "Erik Johansson", country: "SWE", flag: "🇸🇪", points: 495, event1: 2, event2: 1, event3: 3, event4: 1 },
    { rank: 3, athleteId: "3003", name: "Tom Williams", country: "GBR", flag: "🇬🇧", points: 470, event1: 3, event2: 3, event3: 2, event4: 4 },
  ],
  "Intermediate Women": [
    { rank: 1, athleteId: "4001", name: "Sofia Rodriguez", country: "ESP", flag: "🇪🇸", points: 510, event1: 1, event2: 1, event3: 2, event4: 1 },
    { rank: 2, athleteId: "4002", name: "Anna Müller", country: "DEU", flag: "🇩🇪", points: 485, event1: 2, event2: 2, event3: 1, event4: 3 },
    { rank: 3, athleteId: "4003", name: "Claire Dubois", country: "FRA", flag: "🇫🇷", points: 462, event1: 3, event2: 3, event3: 3, event4: 2 },
  ],
  "Masters 35-39": [
    { rank: 1, athleteId: "5001", name: "Jason Carroll", country: "USA", flag: "🇺🇸", points: 490, event1: 1, event2: 1, event3: 2, event4: 1 },
    { rank: 2, athleteId: "5002", name: "David Smith", country: "GBR", flag: "🇬🇧", points: 465, event1: 2, event2: 2, event3: 1, event4: 2 },
  ],
  "Masters 40-44": [
    { rank: 1, athleteId: "6001", name: "Michael Torres", country: "USA", flag: "🇺🇸", points: 475, event1: 1, event2: 2, event3: 1, event4: 1 },
    { rank: 2, athleteId: "6002", name: "Peter Larsson", country: "SWE", flag: "🇸🇪", points: 450, event1: 2, event2: 1, event3: 2, event4: 2 },
  ],
};

const CompetitionDetail = () => {
  const { id } = useParams();
  const [selectedDivision, setSelectedDivision] = useState("Elite Women");
  const competition = mockCompetition;
  const leaderboard = leaderboards[selectedDivision] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Competition Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            {competition.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{competition.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="mr-1">{competition.flag}</span>
              <span>{competition.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{competition.totalAthletes} Athletes</span>
            </div>
          </div>
        </div>

        {/* Competition Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Venue
            </div>
            <div className="text-sm font-medium text-foreground">
              {competition.venue}
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Prize Purse
            </div>
            <div className="text-sm font-medium text-foreground">
              {competition.prizePurse}
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Divisions
            </div>
            <div className="text-sm font-medium text-foreground">
              {competition.divisions.length}
            </div>
          </div>
          <div className="border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Events
            </div>
            <div className="text-sm font-medium text-foreground">
              4 Completed
            </div>
          </div>
        </div>

        {/* Division Selector */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
            Select Division
          </h2>
          <div className="flex flex-wrap gap-2">
            {competition.divisions.map((division) => (
              <button
                key={division}
                onClick={() => setSelectedDivision(division)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  selectedDivision === division
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-border hover:border-foreground"
                }`}
              >
                {division}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
            {selectedDivision} Leaderboard
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium w-16 text-center">
                    Rank
                  </TableHead>
                  <TableHead className="font-medium">Athlete</TableHead>
                  <TableHead className="font-medium text-center w-20">
                    Points
                  </TableHead>
                  <TableHead className="font-medium text-center w-16 hidden sm:table-cell">
                    E1
                  </TableHead>
                  <TableHead className="font-medium text-center w-16 hidden sm:table-cell">
                    E2
                  </TableHead>
                  <TableHead className="font-medium text-center w-16 hidden sm:table-cell">
                    E3
                  </TableHead>
                  <TableHead className="font-medium text-center w-16 hidden sm:table-cell">
                    E4
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((athlete) => (
                  <TableRow key={athlete.athleteId}>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                          athlete.rank === 1
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : athlete.rank === 2
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            : athlete.rank === 3
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {athlete.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{athlete.flag}</span>
                        <Link
                          to={`/athlete/${athlete.athleteId}`}
                          className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                          {athlete.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-foreground">
                      {athlete.points}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground hidden sm:table-cell">
                      {athlete.event1}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground hidden sm:table-cell">
                      {athlete.event2}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground hidden sm:table-cell">
                      {athlete.event3}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground hidden sm:table-cell">
                      {athlete.event4}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            E1-E4 = Individual event placements
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompetitionDetail;
