import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock athlete data - in real app this would come from API
const mockAthlete = {
  id: "3638",
  name: "Laura Horvath",
  country: "Hungary",
  flag: "🇭🇺",
  worldRank: 3,
  nationRank: 1,
  dateOfBirth: "March 21, 1997",
  age: 27,
  sponsors: [
    { id: "nike", name: "Nike" },
    { id: "reebok", name: "Reebok" },
    { id: "under-armour", name: "Under Armour" },
  ],
  gym: { id: "crossfit-mayhem", name: "CrossFit Mayhem" },
  coach: { id: "rich-froning", name: "Rich Froning" },
  achievements: "CrossFit Games Champion 2023, Regional Winner 2022",
};

// Mock ranking history data
const rankingHistory = [
  { year: "2022 Q1", rating: 265 },
  { year: "2022 Q2", rating: 270 },
  { year: "2022 Q3", rating: 275 },
  { year: "2022 Q4", rating: 280 },
  { year: "2023 Q1", rating: 285 },
  { year: "2023 Q2", rating: 286 },
  { year: "2023 Q3", rating: 269 },
  { year: "2023 Q4", rating: 276 },
  { year: "2024 Q1", rating: 278 },
  { year: "2024 Q2", rating: 283 },
  { year: "2024 Q3", rating: 283 },
  { year: "2024 Q4", rating: 283 },
];

// Mock competition history
const competitions = [
  {
    season: "2024",
    events: [
      {
        id: "rogue-2024",
        name: "Rogue Invitational 2024",
        date: "November 08, 2024",
        place: 2,
        location: "Aberdeen, United Kingdom",
        flag: "🇬🇧",
        type: "Ind",
      },
      {
        id: "games-2024",
        name: "2024 CrossFit Games",
        date: "August 05, 2024",
        place: "DNF",
        location: "Fort Worth, TX, USA",
        flag: "🇺🇸",
        type: "Ind",
      },
      {
        id: "quarters-europe-2024",
        name: "2024 CrossFit Quarterfinals: Europe",
        date: "May 19, 2024",
        place: 2,
        location: "Online",
        flag: "🌐",
        type: "Ind",
      },
      {
        id: "semis-europe-2024",
        name: "CrossFit Semifinals 2024: Europe",
        date: "January 01, 2024",
        place: 1,
        location: "Décines-Charpieu, France",
        flag: "🇫🇷",
        type: "Ind",
      },
    ],
  },
  {
    season: "2023",
    events: [
      {
        id: "games-2023",
        name: "2023 CrossFit Games",
        date: "August 05, 2023",
        place: 1,
        location: "Madison, WI, USA",
        flag: "🇺🇸",
        type: "Ind",
      },
      {
        id: "semis-europe-2023",
        name: "CrossFit Semifinals 2023: NOBULL Europe",
        date: "June 04, 2023",
        place: 3,
        location: "Berlin, Germany",
        flag: "🇩🇪",
        type: "Ind",
      },
      {
        id: "quarters-2023",
        name: "CrossFit Individual Quarterfinals 2023",
        date: "April 02, 2023",
        place: 2,
        location: "Online",
        flag: "🌐",
        type: "Ind",
      },
    ],
  },
  {
    season: "2022",
    events: [
      {
        id: "games-2022",
        name: "2022 CrossFit Games",
        date: "August 04, 2022",
        place: 2,
        location: "Madison, WI, USA",
        flag: "🇺🇸",
        type: "Ind",
      },
      {
        id: "semis-europe-2022",
        name: "CrossFit Semifinals 2022: Europe",
        date: "June 10, 2022",
        place: 1,
        location: "Madrid, Spain",
        flag: "🇪🇸",
        type: "Ind",
      },
    ],
  },
];

const AthleteDetail = () => {
  const { id } = useParams();
  const athlete = mockAthlete; // In real app, fetch by id

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
          Back to Rankings
        </Link>

        {/* Athlete Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {athlete.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xl">{athlete.flag}</span>
              <span>{athlete.country}</span>
            </div>
          </div>

          {/* Rank cards */}
          <div className="flex gap-4">
            <div className="border border-border rounded-lg px-6 py-3 text-center min-w-[100px]">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                World Rank
              </div>
              <div className="text-2xl font-bold text-foreground">
                {athlete.worldRank}
              </div>
            </div>
            <div className="border border-border rounded-lg px-6 py-3 text-center min-w-[100px]">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Nation Rank
              </div>
              <div className="text-2xl font-bold text-foreground">
                {athlete.nationRank}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Facts & Rating Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Profile Facts */}
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Profile Facts
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Date of Birth
                </span>
                <span className="text-sm text-foreground">
                  {athlete.dateOfBirth}
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Sponsors
                </span>
                <span className="text-sm text-foreground">
                  {athlete.sponsors.map((sponsor, idx) => (
                    <span key={sponsor.id}>
                      <Link
                        to={`/sponsor/${sponsor.id}`}
                        className="hover:text-muted-foreground transition-colors"
                      >
                        {sponsor.name}
                      </Link>
                      {idx < athlete.sponsors.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Gym
                </span>
                <Link
                  to={`/gym/${athlete.gym.id}`}
                  className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                >
                  {athlete.gym.name}
                </Link>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Coach
                </span>
                <Link
                  to={`/coach/${athlete.coach.id}`}
                  className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                >
                  {athlete.coach.name}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  Achievements
                </span>
                <span className="text-sm text-foreground text-right max-w-[200px]">
                  {athlete.achievements}
                </span>
              </div>
            </div>
          </div>

          {/* Rating Trend */}
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Rating Trend
            </h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rankingHistory}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    domain={["dataMin - 10", "dataMax + 10"]}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="stepAfter"
                    dataKey="rating"
                    stroke="hsl(var(--foreground))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Competition History */}
        <div>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
            Competition History
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium">Competition</TableHead>
                  <TableHead className="font-medium text-center w-20">
                    Place
                  </TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium text-center w-20">
                    Type
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.map((season) => (
                  <>
                    {/* Season header */}
                    <TableRow
                      key={`season-${season.season}`}
                      className="bg-muted/50"
                    >
                      <TableCell
                        colSpan={4}
                        className="font-semibold text-sm py-2"
                      >
                        {season.season} Season
                      </TableCell>
                    </TableRow>
                    {/* Events */}
                    {season.events.map((event, idx) => (
                      <TableRow key={`${season.season}-${idx}`}>
                        <TableCell>
                          <div>
                            <Link
                              to={`/competition/${event.id}`}
                              className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                            >
                              {event.name}
                            </Link>
                            <div className="text-xs text-muted-foreground">
                              {event.date}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={
                              event.place === 1
                                ? "font-bold text-foreground"
                                : event.place === "DNF"
                                ? "text-destructive"
                                : "text-foreground"
                            }
                          >
                            {event.place}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{event.flag}</span>
                            <span className="text-sm">{event.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
                            {event.type}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AthleteDetail;
