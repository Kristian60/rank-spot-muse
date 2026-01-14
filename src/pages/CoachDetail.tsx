import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Award } from "lucide-react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock coach data
const mockCoaches: Record<string, { name: string; country: string; flag: string; description: string; experience: string; achievements: string }> = {
  "rich-froning": {
    name: "Rich Froning",
    country: "USA",
    flag: "🇺🇸",
    description: "Rich Froning is a legendary CrossFit athlete and coach. As a 4-time Individual CrossFit Games champion (2011-2014) and 4-time Team champion with CrossFit Mayhem Freedom, Froning is widely considered the greatest CrossFit athlete of all time. He now leads CrossFit Mayhem, developing the next generation of elite athletes.",
    experience: "15+ years",
    achievements: "8x CrossFit Games Champion, CrossFit Mayhem Founder",
  },
  "harry-palley": {
    name: "Harry Palley",
    country: "USA",
    flag: "🇺🇸",
    description: "Harry Palley is the head coach and founder of PRVN Fitness. Known for his methodical and data-driven approach to programming, Palley has helped develop multiple CrossFit Games athletes and continues to push the boundaries of elite fitness coaching.",
    experience: "10+ years",
    achievements: "PRVN Fitness Founder, Multiple Games Athletes Coached",
  },
  "matt-fraser-coach": {
    name: "Ben Bergeron",
    country: "USA",
    flag: "🇺🇸",
    description: "Ben Bergeron is one of the most renowned coaches in CrossFit history. As founder of CrossFit New England (CFNE) and the Comptrain methodology, he has coached numerous CrossFit Games champions including Mat Fraser and Katrin Davidsdottir.",
    experience: "18+ years",
    achievements: "Multiple Games Champions Coached, Comptrain Founder, Author",
  },
  "shane-orr": {
    name: "Shane Orr",
    country: "Australia",
    flag: "🇦🇺",
    description: "Shane Orr is the coach behind Tia-Clair Toomey, the most decorated female CrossFit athlete. His coaching philosophy combines strategic programming with mental preparation, helping athletes reach their full potential on the competition floor.",
    experience: "12+ years",
    achievements: "Coach of 6x CrossFit Games Champion Tia-Clair Toomey",
  },
};

// Mock coached athletes
const coachedAthletes = {
  men: [
    { id: "1", rank: 2, name: "Rich Froning", country: "USA", flag: "🇺🇸", points: 1234 },
    { id: "2", rank: 6, name: "Scott Panchik", country: "USA", flag: "🇺🇸", points: 1189 },
    { id: "3", rank: 9, name: "Austin Hatfield", country: "USA", flag: "🇺🇸", points: 1156 },
  ],
  women: [
    { id: "4", rank: 3, name: "Laura Horvath", country: "Hungary", flag: "🇭🇺", points: 1201 },
    { id: "5", rank: 8, name: "Andrea Nisler", country: "USA", flag: "🇺🇸", points: 1167 },
    { id: "6", rank: 12, name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 1145 },
  ],
};

const CoachDetail = () => {
  const { id } = useParams();
  const coach = mockCoaches[id || "rich-froning"] || mockCoaches["rich-froning"];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Coach Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{coach.name}</h1>
            <span className="text-2xl">{coach.flag}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Award className="h-4 w-4" />
            <span>Professional Coach</span>
          </div>
          <p className="text-muted-foreground max-w-3xl mb-4">{coach.description}</p>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Experience: </span>
              <span className="text-foreground font-medium">{coach.experience}</span>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-muted-foreground">Notable: </span>
            <span className="text-foreground">{coach.achievements}</span>
          </div>
        </div>

        {/* Coached Athletes */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Athletes Coached
            </h2>
          </div>

          <Tabs defaultValue="men" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-auto p-0">
              <TabsTrigger
                value="men"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
              >
                Men
              </TabsTrigger>
              <TabsTrigger
                value="women"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
              >
                Women
              </TabsTrigger>
            </TabsList>

            <TabsContent value="men" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20">
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Athlete</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coachedAthletes.men.map((athlete) => (
                    <TableRow key={athlete.id}>
                      <TableCell className="font-medium">{athlete.rank}</TableCell>
                      <TableCell>
                        <Link
                          to={`/athlete/${athlete.id}`}
                          className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                          {athlete.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{athlete.flag}</span>
                          <span className="text-muted-foreground">{athlete.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{athlete.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="women" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20">
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Athlete</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coachedAthletes.women.map((athlete) => (
                    <TableRow key={athlete.id}>
                      <TableCell className="font-medium">{athlete.rank}</TableCell>
                      <TableCell>
                        <Link
                          to={`/athlete/${athlete.id}`}
                          className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                        >
                          {athlete.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{athlete.flag}</span>
                          <span className="text-muted-foreground">{athlete.country}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{athlete.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CoachDetail;
