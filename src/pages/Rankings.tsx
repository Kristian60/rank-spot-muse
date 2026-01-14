import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Athlete {
  id: string;
  worldRank: number;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  points: number;
}

// Extended mock data - World Top 100 Men
const allMenAthletes: Athlete[] = [
  { id: "1001", worldRank: 1, name: "Jeffrey Adler", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 1245 },
  { id: "1002", worldRank: 2, name: "James Sprague", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 1198 },
  { id: "1003", worldRank: 3, name: "Brent Fikowski", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 1156 },
  { id: "1004", worldRank: 4, name: "Dallin Pepper", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 1089 },
  { id: "1005", worldRank: 5, name: "Patrick Vellner", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 1045 },
  { id: "1006", worldRank: 6, name: "Roman Khrennikov", country: "Russia", countryCode: "RUS", flag: "🇷🇺", points: 987 },
  { id: "1007", worldRank: 7, name: "Lazar Đukić", country: "Serbia", countryCode: "SRB", flag: "🇷🇸", points: 945 },
  { id: "1008", worldRank: 8, name: "Jonne Koski", country: "Finland", countryCode: "FIN", flag: "🇫🇮", points: 912 },
  { id: "1009", worldRank: 9, name: "Björgvin Karl Guðmundsson", country: "Iceland", countryCode: "ISL", flag: "🇮🇸", points: 876 },
  { id: "1010", worldRank: 10, name: "Ricky Garard", country: "Australia", countryCode: "AUS", flag: "🇦🇺", points: 854 },
  { id: "1011", worldRank: 11, name: "Travis Mayer", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 832 },
  { id: "1012", worldRank: 12, name: "Cole Greashaber", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 810 },
  { id: "1013", worldRank: 13, name: "Saxon Panchik", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 789 },
  { id: "1014", worldRank: 14, name: "Jayson Hopper", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 768 },
  { id: "1015", worldRank: 15, name: "Harry Lightfoot", country: "United Kingdom", countryCode: "GBR", flag: "🇬🇧", points: 747 },
  { id: "1016", worldRank: 16, name: "Noah Ohlsen", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 726 },
  { id: "1017", worldRank: 17, name: "Cole Sager", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 705 },
  { id: "1018", worldRank: 18, name: "Victor Hoffer", country: "Brazil", countryCode: "BRA", flag: "🇧🇷", points: 684 },
  { id: "1019", worldRank: 19, name: "Alexandre Caron", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 663 },
  { id: "1020", worldRank: 20, name: "Guilherme Malheiros", country: "Brazil", countryCode: "BRA", flag: "🇧🇷", points: 642 },
  { id: "1021", worldRank: 21, name: "Samuel Kwant", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 621 },
  { id: "1022", worldRank: 22, name: "Tudor Magda", country: "Romania", countryCode: "ROU", flag: "🇷🇴", points: 600 },
  { id: "1023", worldRank: 23, name: "Moritz Fiebig", country: "Germany", countryCode: "DEU", flag: "🇩🇪", points: 579 },
  { id: "1024", worldRank: 24, name: "André Houdet", country: "France", countryCode: "FRA", flag: "🇫🇷", points: 558 },
  { id: "1025", worldRank: 25, name: "Luka Đukić", country: "Serbia", countryCode: "SRB", flag: "🇷🇸", points: 537 },
  // Continue for demonstration - in real app would have 100 athletes
  ...Array.from({ length: 75 }, (_, i) => ({
    id: `10${26 + i}`,
    worldRank: 26 + i,
    name: `Athlete ${26 + i}`,
    country: ["United States", "Canada", "Australia", "United Kingdom", "Germany"][i % 5],
    countryCode: ["USA", "CAN", "AUS", "GBR", "DEU"][i % 5],
    flag: ["🇺🇸", "🇨🇦", "🇦🇺", "🇬🇧", "🇩🇪"][i % 5],
    points: 520 - i * 5,
  })),
];

// Extended mock data - World Top 100 Women
const allWomenAthletes: Athlete[] = [
  { id: "2001", worldRank: 1, name: "Tia-Clair Toomey", country: "Australia", countryCode: "AUS", flag: "🇦🇺", points: 1456 },
  { id: "3638", worldRank: 2, name: "Laura Horvath", country: "Hungary", countryCode: "HUN", flag: "🇭🇺", points: 1287 },
  { id: "2003", worldRank: 3, name: "Emma Lawson", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 1198 },
  { id: "2004", worldRank: 4, name: "Haley Adams", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 1134 },
  { id: "2005", worldRank: 5, name: "Gabriela Migała", country: "Poland", countryCode: "POL", flag: "🇵🇱", points: 1089 },
  { id: "2006", worldRank: 6, name: "Danielle Brandon", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 1023 },
  { id: "2007", worldRank: 7, name: "Alexis Raptis", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 987 },
  { id: "2008", worldRank: 8, name: "Brooke Wells", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 945 },
  { id: "2009", worldRank: 9, name: "Emma Tall", country: "Sweden", countryCode: "SWE", flag: "🇸🇪", points: 912 },
  { id: "2010", worldRank: 10, name: "Bethany Flores", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 878 },
  { id: "2011", worldRank: 11, name: "Amanda Barnhart", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 856 },
  { id: "2012", worldRank: 12, name: "Paige Semenza", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 834 },
  { id: "2013", worldRank: 13, name: "Arielle Loewen", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 812 },
  { id: "2014", worldRank: 14, name: "Emily Rolfe", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 790 },
  { id: "2015", worldRank: 15, name: "Annie Thorisdottir", country: "Iceland", countryCode: "ISL", flag: "🇮🇸", points: 768 },
  { id: "2016", worldRank: 16, name: "Jacqueline Dahlstrøm", country: "Denmark", countryCode: "DNK", flag: "🇩🇰", points: 746 },
  { id: "2017", worldRank: 17, name: "Elisa Fuliano", country: "Italy", countryCode: "ITA", flag: "🇮🇹", points: 724 },
  { id: "2018", worldRank: 18, name: "Caroline Stanley", country: "United States", countryCode: "USA", flag: "🇺🇸", points: 702 },
  { id: "2019", worldRank: 19, name: "Chloe Gauvin-David", country: "Canada", countryCode: "CAN", flag: "🇨🇦", points: 680 },
  { id: "2020", worldRank: 20, name: "Claudia Gluck", country: "Argentina", countryCode: "ARG", flag: "🇦🇷", points: 658 },
  { id: "2021", worldRank: 21, name: "Victoria Campos", country: "Mexico", countryCode: "MEX", flag: "🇲🇽", points: 636 },
  { id: "2022", worldRank: 22, name: "Freya Moosbrugger", country: "Austria", countryCode: "AUT", flag: "🇦🇹", points: 614 },
  { id: "2023", worldRank: 23, name: "Linda Keesman", country: "Netherlands", countryCode: "NLD", flag: "🇳🇱", points: 592 },
  { id: "2024", worldRank: 24, name: "Julia Kato", country: "Japan", countryCode: "JPN", flag: "🇯🇵", points: 570 },
  { id: "2025", worldRank: 25, name: "Sara Sigmundsdottir", country: "Iceland", countryCode: "ISL", flag: "🇮🇸", points: 548 },
  // Continue for demonstration - in real app would have 100 athletes
  ...Array.from({ length: 75 }, (_, i) => ({
    id: `20${26 + i}`,
    worldRank: 26 + i,
    name: `Athlete ${26 + i}`,
    country: ["United States", "Canada", "Australia", "United Kingdom", "Sweden"][i % 5],
    countryCode: ["USA", "CAN", "AUS", "GBR", "SWE"][i % 5],
    flag: ["🇺🇸", "🇨🇦", "🇦🇺", "🇬🇧", "🇸🇪"][i % 5],
    points: 530 - i * 5,
  })),
];

// Get unique countries
const allCountries = Array.from(
  new Set([
    ...allMenAthletes.map((a) => a.country),
    ...allWomenAthletes.map((a) => a.country),
  ])
).sort();

const ITEMS_PER_PAGE = 25;

const Rankings = () => {
  const [selectedGender, setSelectedGender] = useState<"men" | "women">("men");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const athletes = selectedGender === "men" ? allMenAthletes : allWomenAthletes;

  // Filter by country and add national rank
  const filteredAthletes = useMemo(() => {
    if (selectedCountry === "all") {
      return athletes.map((a, idx) => ({ ...a, nationalRank: null }));
    }
    
    const countryAthletes = athletes.filter((a) => a.country === selectedCountry);
    return countryAthletes.map((a, idx) => ({
      ...a,
      nationalRank: idx + 1,
    }));
  }, [athletes, selectedCountry]);

  // Pagination
  const totalPages = Math.ceil(filteredAthletes.length / ITEMS_PER_PAGE);
  const paginatedAthletes = filteredAthletes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleGenderChange = (gender: "men" | "women") => {
    setSelectedGender(gender);
    setCurrentPage(1);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  const isNationalView = selectedCountry !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isNationalView ? `${selectedCountry} Rankings` : "World Rankings"}
          </h1>
          <p className="text-muted-foreground">
            {isNationalView
              ? `Top 100 athletes from ${selectedCountry}`
              : "Top 100 athletes globally"}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Gender Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => handleGenderChange("men")}
              className={`px-6 py-2 text-sm font-medium rounded-lg border transition-colors ${
                selectedGender === "men"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground"
              }`}
            >
              Men
            </button>
            <button
              onClick={() => handleGenderChange("women")}
              className={`px-6 py-2 text-sm font-medium rounded-lg border transition-colors ${
                selectedGender === "women"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground"
              }`}
            >
              Women
            </button>
          </div>

          {/* Country Selector */}
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🌍 World</SelectItem>
              {allCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rankings Table */}
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                {isNationalView && (
                  <TableHead className="font-medium w-16 text-center">
                    #
                  </TableHead>
                )}
                <TableHead className="font-medium w-20 text-center">
                  {isNationalView ? "World" : "Rank"}
                </TableHead>
                <TableHead className="font-medium">Athlete</TableHead>
                <TableHead className="font-medium text-right w-24">
                  Points
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAthletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  {isNationalView && (
                    <TableCell className="text-center font-bold text-foreground">
                      {athlete.nationalRank}
                    </TableCell>
                  )}
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                        athlete.worldRank === 1
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : athlete.worldRank === 2
                          ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          : athlete.worldRank === 3
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {athlete.worldRank}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{athlete.flag}</span>
                      <Link
                        to={`/athlete/${athlete.id}`}
                        className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {athlete.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground tabular-nums">
                    {athlete.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mb-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredAthletes.length)} of{" "}
          {filteredAthletes.length} athletes
        </p>
      </main>
    </div>
  );
};

export default Rankings;
