import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
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

// Mock gym data
const mockGyms: Record<string, { name: string; location: string; description: string; founded: string; headCoach: string }> = {
  "crossfit-mayhem": {
    name: "CrossFit Mayhem",
    location: "Cookeville, Tennessee, USA",
    description: "CrossFit Mayhem, founded by Rich Froning, is one of the most successful CrossFit training facilities in the world. The Mayhem Empire has produced multiple CrossFit Games champions and top competitors. Known for their team culture and elite programming, Mayhem has become synonymous with excellence in functional fitness.",
    founded: "2010",
    headCoach: "Rich Froning",
  },
  "crossfit-krypton": {
    name: "CrossFit Krypton",
    location: "Mérida, Yucatan, Mexico",
    description: "CrossFit Krypton is a premier training facility known for developing elite CrossFit athletes. With state-of-the-art equipment and world-class coaching, Krypton has become a destination for athletes looking to take their performance to the next level.",
    founded: "2015",
    headCoach: "Various",
  },
  "tth-training": {
    name: "TTH Training",
    location: "Sydney, Australia",
    description: "TTH Training (Train to Hunt) is an elite performance facility that has produced some of Australia's top CrossFit competitors. Their evidence-based approach to training combines strength, conditioning, and recovery protocols.",
    founded: "2018",
    headCoach: "Multiple",
  },
  "prvn-fitness": {
    name: "PRVN Fitness",
    location: "Knoxville, Tennessee, USA",
    description: "PRVN Fitness, led by Harry Palley, is a premier CrossFit training program that has produced multiple Games athletes. Known for their methodical approach to programming and athlete development.",
    founded: "2019",
    headCoach: "Harry Palley",
  },
};

// Mock affiliated athletes
const affiliatedAthletes = {
  men: [
    { id: "1", rank: 2, name: "Rich Froning", country: "USA", flag: "🇺🇸", points: 1234 },
    { id: "2", rank: 6, name: "Scott Panchik", country: "USA", flag: "🇺🇸", points: 1189 },
    { id: "3", rank: 9, name: "Austin Hatfield", country: "USA", flag: "🇺🇸", points: 1156 },
    { id: "4", rank: 14, name: "Dre Strohm", country: "USA", flag: "🇺🇸", points: 1121 },
  ],
  women: [
    { id: "5", rank: 3, name: "Laura Horvath", country: "Hungary", flag: "🇭🇺", points: 1201 },
    { id: "6", rank: 8, name: "Andrea Nisler", country: "USA", flag: "🇺🇸", points: 1167 },
    { id: "7", rank: 12, name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 1145 },
    { id: "8", rank: 19, name: "Taylor Williamson", country: "USA", flag: "🇺🇸", points: 1087 },
  ],
};

const GymDetail = () => {
  const { id } = useParams();
  const gym = mockGyms[id || "crossfit-mayhem"] || mockGyms["crossfit-mayhem"];

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

        {/* Gym Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{gym.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>{gym.location}</span>
          </div>
          <p className="text-muted-foreground max-w-3xl mb-4">{gym.description}</p>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Founded: </span>
              <span className="text-foreground font-medium">{gym.founded}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Head Coach: </span>
              <span className="text-foreground font-medium">{gym.headCoach}</span>
            </div>
          </div>
        </div>

        {/* Affiliated Athletes */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Athletes Training Here
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
                  {affiliatedAthletes.men.map((athlete) => (
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
                  {affiliatedAthletes.women.map((athlete) => (
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

export default GymDetail;
