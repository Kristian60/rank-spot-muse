import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

// Mock sponsor data
const mockSponsors: Record<string, { name: string; description: string; website: string; logo: string }> = {
  nike: {
    name: "Nike",
    description: "Nike is a global leader in athletic footwear, apparel, and equipment. As a major sponsor in the CrossFit community, Nike provides cutting-edge performance gear designed to help athletes push their limits. Their Metcon line has become the go-to training shoe for elite CrossFit competitors worldwide.",
    website: "nike.com",
    logo: "✓",
  },
  reebok: {
    name: "Reebok",
    description: "Reebok was the original official footwear and apparel sponsor of CrossFit. Known for the Nano series, Reebok continues to support elite athletes with performance-driven training gear built for functional fitness.",
    website: "reebok.com",
    logo: "◇",
  },
  "under-armour": {
    name: "Under Armour",
    description: "Under Armour provides innovative performance apparel, footwear, and accessories. Their commitment to helping athletes perform at their peak makes them a trusted partner for CrossFit competitors seeking premium training gear.",
    website: "underarmour.com",
    logo: "◆",
  },
  nobull: {
    name: "NOBULL",
    description: "NOBULL is the official footwear and apparel partner of the CrossFit Games. Known for their minimalist, durable training shoes and apparel, NOBULL has become synonymous with the CrossFit community and elite functional fitness.",
    website: "nobullproject.com",
    logo: "●",
  },
};

// Mock affiliated athletes
const affiliatedAthletes = {
  men: [
    { id: "1", rank: 1, name: "Justin Medeiros", country: "USA", flag: "🇺🇸", points: 1245 },
    { id: "2", rank: 5, name: "Roman Khrennikov", country: "Russia", flag: "🇷🇺", points: 1198 },
    { id: "3", rank: 8, name: "Jonne Koski", country: "Finland", flag: "🇫🇮", points: 1156 },
    { id: "4", rank: 12, name: "Lazar Đukić", country: "Serbia", flag: "🇷🇸", points: 1134 },
    { id: "5", rank: 15, name: "Saxon Panchik", country: "USA", flag: "🇺🇸", points: 1112 },
  ],
  women: [
    { id: "6", rank: 3, name: "Laura Horvath", country: "Hungary", flag: "🇭🇺", points: 1201 },
    { id: "7", rank: 7, name: "Emma Lawson", country: "Canada", flag: "🇨🇦", points: 1167 },
    { id: "8", rank: 11, name: "Alexis Raptis", country: "USA", flag: "🇺🇸", points: 1145 },
    { id: "9", rank: 14, name: "Danielle Brandon", country: "USA", flag: "🇺🇸", points: 1123 },
    { id: "10", rank: 18, name: "Brooke Wells", country: "USA", flag: "🇺🇸", points: 1098 },
  ],
};

const SponsorDetail = () => {
  const { id } = useParams();
  const sponsor = mockSponsors[id || "nike"] || mockSponsors.nike;

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

        {/* Sponsor Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 border border-border rounded-lg flex items-center justify-center text-3xl bg-muted/30">
              {sponsor.logo}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{sponsor.name}</h1>
              <a
                href={`https://${sponsor.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {sponsor.website}
              </a>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">{sponsor.description}</p>
        </div>

        {/* Affiliated Athletes */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Sponsored Athletes
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

export default SponsorDetail;
