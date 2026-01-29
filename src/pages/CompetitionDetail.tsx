import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Trophy, Medal, Clock, Shield } from "lucide-react";
import { Header } from "@/components/Header";
import { EditableText } from "@/components/EditableText";
import { CompetitionAdminPanel } from "@/components/CompetitionAdminPanel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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

// CrossFit Games history type
type GamesResult = "gold" | "silver" | "bronze" | "participated";
type GamesEntry = { result: GamesResult; team?: boolean };

// Mock leaderboard data by division - expanded with DNF athletes and accolades
const leaderboards: Record<string, Array<{
  rank: number | "DNF";
  athleteId: string;
  name: string;
  country: string;
  flag: string;
  points: number | null;
  event1: number | "DNF";
  event2: number | "DNF";
  event3: number | "DNF";
  event4: number | "DNF";
  worldRank?: number;
  nationalRank?: number;
  gamesHistory?: GamesEntry[]; // Most recent first
}>> = {
  "Elite Men": [
    { rank: 1, athleteId: "1001", name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦", points: 580, event1: 1, event2: 2, event3: 1, event4: 3, worldRank: 1, nationalRank: 1, gamesHistory: [{ result: "gold" }, { result: "silver" }, { result: "participated" }, { result: "participated" }] },
    { rank: 2, athleteId: "1002", name: "James Sprague", country: "USA", flag: "🇺🇸", points: 545, event1: 3, event2: 1, event3: 4, event4: 1, worldRank: 3, nationalRank: 1, gamesHistory: [{ result: "silver" }, { result: "participated" }] },
    { rank: 3, athleteId: "1003", name: "Brent Fikowski", country: "CAN", flag: "🇨🇦", points: 520, event1: 2, event2: 5, event3: 2, event4: 2, worldRank: 4, nationalRank: 2, gamesHistory: [{ result: "bronze" }, { result: "participated" }, { result: "participated" }, { result: "gold", team: true }, { result: "participated" }, { result: "participated" }] },
    { rank: 4, athleteId: "1004", name: "Dallin Pepper", country: "USA", flag: "🇺🇸", points: 498, event1: 4, event2: 3, event3: 5, event4: 4, worldRank: 5, nationalRank: 2, gamesHistory: [{ result: "participated" }, { result: "participated" }] },
    { rank: 5, athleteId: "1005", name: "Patrick Vellner", country: "CAN", flag: "🇨🇦", points: 475, event1: 5, event2: 4, event3: 3, event4: 6, worldRank: 6, nationalRank: 3, gamesHistory: [{ result: "bronze" }, { result: "silver" }, { result: "bronze" }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 6, athleteId: "1006", name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺", points: 456, event1: 6, event2: 6, event3: 6, event4: 5, worldRank: 2, nationalRank: 1, gamesHistory: [{ result: "participated" }] },
    { rank: 7, athleteId: "1007", name: "Lazar Đukić", country: "SRB", flag: "🇷🇸", points: 432, event1: 7, event2: 8, event3: 7, event4: 7, worldRank: 8, nationalRank: 1, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 8, athleteId: "1008", name: "Jonne Koski", country: "FIN", flag: "🇫🇮", points: 410, event1: 8, event2: 7, event3: 9, event4: 8, worldRank: 12, nationalRank: 1, gamesHistory: [{ result: "participated" }, { result: "silver", team: true }, { result: "participated" }, { result: "participated" }] },
    { rank: 9, athleteId: "1009", name: "Ricky Garard", country: "AUS", flag: "🇦🇺", points: 395, event1: 9, event2: 9, event3: 8, event4: 10, worldRank: 10, nationalRank: 1, gamesHistory: [{ result: "bronze" }, { result: "participated" }] },
    { rank: 10, athleteId: "1010", name: "Cole Greashaber", country: "USA", flag: "🇺🇸", points: 378, event1: 10, event2: 10, event3: 10, event4: 9, worldRank: 15, nationalRank: 5 },
    { rank: 11, athleteId: "1011", name: "Travis Mayer", country: "USA", flag: "🇺🇸", points: 362, event1: 11, event2: 11, event3: 11, event4: 11, worldRank: 18, nationalRank: 6, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "bronze", team: true }, { result: "participated", team: true }, { result: "participated" }] },
    { rank: 12, athleteId: "1012", name: "Björgvin Karl Gudmundsson", country: "ISL", flag: "🇮🇸", points: 345, event1: 12, event2: 13, event3: 12, event4: 12, worldRank: 20, nationalRank: 1, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 13, athleteId: "1013", name: "Saxon Panchik", country: "USA", flag: "🇺🇸", points: 330, event1: 14, event2: 12, event3: 13, event4: 13, worldRank: 22, nationalRank: 7, gamesHistory: [{ result: "participated" }, { result: "participated" }] },
    { rank: 14, athleteId: "1014", name: "Jayson Hopper", country: "USA", flag: "🇺🇸", points: 315, event1: 13, event2: 14, event3: 14, event4: 15, worldRank: 25, nationalRank: 8, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 15, athleteId: "1015", name: "Harry Lightfoot", country: "GBR", flag: "🇬🇧", points: 298, event1: 15, event2: 15, event3: 16, event4: 14, worldRank: 28, nationalRank: 1, gamesHistory: [{ result: "participated" }] },
    { rank: "DNF", athleteId: "1016", name: "Noah Ohlsen", country: "USA", flag: "🇺🇸", points: null, event1: 16, event2: "DNF", event3: "DNF", event4: "DNF", worldRank: 11, nationalRank: 4, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: "DNF", athleteId: "1017", name: "Cole Sager", country: "USA", flag: "🇺🇸", points: null, event1: 17, event2: 16, event3: "DNF", event4: "DNF", worldRank: 35, nationalRank: 12, gamesHistory: [{ result: "participated" }, { result: "participated" }] },
  ],
  "Elite Women": [
    { rank: 1, athleteId: "2001", name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺", points: 600, event1: 1, event2: 1, event3: 1, event4: 1, worldRank: 1, nationalRank: 1, gamesHistory: [{ result: "gold" }, { result: "gold" }, { result: "gold" }, { result: "gold" }, { result: "gold" }, { result: "gold" }] },
    { rank: 2, athleteId: "3638", name: "Laura Horvath", country: "HUN", flag: "🇭🇺", points: 555, event1: 2, event2: 3, event3: 2, event4: 2, worldRank: 2, nationalRank: 1, gamesHistory: [{ result: "silver" }, { result: "participated" }, { result: "participated" }, { result: "bronze" }, { result: "participated" }] },
    { rank: 3, athleteId: "2003", name: "Emma Lawson", country: "CAN", flag: "🇨🇦", points: 528, event1: 3, event2: 2, event3: 4, event4: 3, worldRank: 3, nationalRank: 1, gamesHistory: [{ result: "bronze" }, { result: "participated" }] },
    { rank: 4, athleteId: "2004", name: "Haley Adams", country: "USA", flag: "🇺🇸", points: 502, event1: 4, event2: 4, event3: 3, event4: 5, worldRank: 4, nationalRank: 1, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 5, athleteId: "2005", name: "Gabriela Migała", country: "POL", flag: "🇵🇱", points: 478, event1: 5, event2: 5, event3: 6, event4: 4, worldRank: 5, nationalRank: 1, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 6, athleteId: "2006", name: "Danielle Brandon", country: "USA", flag: "🇺🇸", points: 445, event1: 6, event2: 7, event3: 5, event4: 6, worldRank: 9, nationalRank: 3, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 7, athleteId: "2007", name: "Alexis Raptis", country: "USA", flag: "🇺🇸", points: 420, event1: 7, event2: 6, event3: 8, event4: 7, worldRank: 7, nationalRank: 2, gamesHistory: [{ result: "participated" }, { result: "participated" }] },
    { rank: 8, athleteId: "2008", name: "Brooke Wells", country: "USA", flag: "🇺🇸", points: 398, event1: 8, event2: 8, event3: 7, event4: 9, worldRank: 12, nationalRank: 5, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "gold", team: true }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 9, athleteId: "2009", name: "Amanda Barnhart", country: "USA", flag: "🇺🇸", points: 375, event1: 9, event2: 10, event3: 9, event4: 8, worldRank: 14, nationalRank: 6, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 10, athleteId: "2010", name: "Paige Semenza", country: "USA", flag: "🇺🇸", points: 358, event1: 10, event2: 9, event3: 11, event4: 10, worldRank: 16, nationalRank: 7, gamesHistory: [{ result: "participated" }] },
    { rank: 11, athleteId: "2011", name: "Arielle Loewen", country: "USA", flag: "🇺🇸", points: 340, event1: 11, event2: 11, event3: 10, event4: 12, worldRank: 18, nationalRank: 8, gamesHistory: [{ result: "participated" }, { result: "participated" }, { result: "participated" }] },
    { rank: 12, athleteId: "2012", name: "Bethany Flores", country: "USA", flag: "🇺🇸", points: 325, event1: 12, event2: 13, event3: 12, event4: 11, worldRank: 22, nationalRank: 10 },
    { rank: "DNF", athleteId: "2013", name: "Emily Rolfe", country: "CAN", flag: "🇨🇦", points: null, event1: 13, event2: 12, event3: "DNF", event4: "DNF", worldRank: 15, nationalRank: 2, gamesHistory: [{ result: "participated" }, { result: "participated" }] },
    { rank: "DNF", athleteId: "2014", name: "Annie Thorisdottir", country: "ISL", flag: "🇮🇸", points: null, event1: "DNF", event2: "DNF", event3: "DNF", event4: "DNF", worldRank: 8, nationalRank: 1, gamesHistory: [{ result: "participated" }, { result: "gold" }, { result: "gold" }, { result: "participated" }, { result: "silver" }, { result: "participated" }] },
  ],
  "Intermediate Men": [
    { rank: 1, athleteId: "3001", name: "Marcus Chen", country: "USA", flag: "🇺🇸", points: 520, event1: 1, event2: 2, event3: 1, event4: 2, worldRank: 45, nationalRank: 15 },
    { rank: 2, athleteId: "3002", name: "Erik Johansson", country: "SWE", flag: "🇸🇪", points: 495, event1: 2, event2: 1, event3: 3, event4: 1, worldRank: 52, nationalRank: 1 },
    { rank: 3, athleteId: "3003", name: "Tom Williams", country: "GBR", flag: "🇬🇧", points: 470, event1: 3, event2: 3, event3: 2, event4: 4, worldRank: 58, nationalRank: 2 },
  ],
  "Intermediate Women": [
    { rank: 1, athleteId: "4001", name: "Sofia Rodriguez", country: "ESP", flag: "🇪🇸", points: 510, event1: 1, event2: 1, event3: 2, event4: 1, worldRank: 40, nationalRank: 1 },
    { rank: 2, athleteId: "4002", name: "Anna Müller", country: "DEU", flag: "🇩🇪", points: 485, event1: 2, event2: 2, event3: 1, event4: 3, worldRank: 48, nationalRank: 1 },
    { rank: 3, athleteId: "4003", name: "Claire Dubois", country: "FRA", flag: "🇫🇷", points: 462, event1: 3, event2: 3, event3: 3, event4: 2, worldRank: 55, nationalRank: 1 },
  ],
  "Masters 35-39": [
    { rank: 1, athleteId: "5001", name: "Jason Carroll", country: "USA", flag: "🇺🇸", points: 490, event1: 1, event2: 1, event3: 2, event4: 1, worldRank: 1, nationalRank: 1, gamesHistory: [{ result: "gold" }, { result: "silver" }] },
    { rank: 2, athleteId: "5002", name: "David Smith", country: "GBR", flag: "🇬🇧", points: 465, event1: 2, event2: 2, event3: 1, event4: 2, worldRank: 3, nationalRank: 1, gamesHistory: [{ result: "participated" }] },
  ],
  "Masters 40-44": [
    { rank: 1, athleteId: "6001", name: "Michael Torres", country: "USA", flag: "🇺🇸", points: 475, event1: 1, event2: 2, event3: 1, event4: 1, worldRank: 2, nationalRank: 1, gamesHistory: [{ result: "bronze" }, { result: "participated" }, { result: "participated" }] },
    { rank: 2, athleteId: "6002", name: "Peter Larsson", country: "SWE", flag: "🇸🇪", points: 450, event1: 2, event2: 1, event3: 2, event4: 2, worldRank: 5, nationalRank: 1 },
  ],
};

// Games emblem component - cleaner style with G icon
const GamesEmblem = ({ entry, index }: { entry: GamesEntry; index: number }) => {
  const colorStyles = {
    gold: { bg: "#facc15", border: "#ca8a04", text: "#713f12" },
    silver: { bg: "#c0c0c0", border: "#71717a", text: "#3f3f46" },
    bronze: { bg: "#cd7f32", border: "#92400e", text: "#451a03" },
    participated: { bg: "#f3f4f6", border: "#d1d5db", text: "#9ca3af" },
  };
  
  const style = colorStyles[entry.result];
  
  return (
    <div
      className="relative w-4 h-4 rounded-sm flex items-center justify-center"
      style={{ 
        marginLeft: index === 0 ? 0 : -5,
        zIndex: 10 - index,
        boxShadow: entry.result !== "participated" ? "0 1px 2px rgba(0,0,0,0.25)" : "none",
        backgroundColor: style.bg,
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: style.border,
      }}
      title={`Games: ${entry.result === "participated" ? "Competed" : entry.result.charAt(0).toUpperCase() + entry.result.slice(1)}${entry.team ? " (Team)" : ""}`}
    >
      {/* G for Games */}
      <span 
        className="text-[9px] font-black leading-none"
        style={{ color: style.text }}
      >
        G
      </span>
      {/* Team superscript - more visible */}
      {entry.team && (
        <span 
          className="absolute -top-1.5 -right-1.5 text-[8px] font-black leading-none bg-foreground text-background rounded-full w-3 h-3 flex items-center justify-center"
        >
          T
        </span>
      )}
    </div>
  );
};

// Rank badge component - with subtle outline
const RankBadge = ({ rank, icon }: { rank?: number; icon: string }) => {
  if (!rank) return null;
  
  return (
    <span 
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-muted/60 border border-border text-[10px] text-muted-foreground tabular-nums"
      title={icon === "🌍" ? `World Rank #${rank}` : `National Rank #${rank}`}
    >
      {icon}{rank}
    </span>
  );
};

// Sort Games entries by importance: gold > silver > bronze > participated, individual > team
const sortGamesEntries = (entries: GamesEntry[]): GamesEntry[] => {
  const priority: Record<GamesResult, number> = { gold: 0, silver: 1, bronze: 2, participated: 3 };
  return [...entries].sort((a, b) => {
    const medalDiff = priority[a.result] - priority[b.result];
    if (medalDiff !== 0) return medalDiff;
    // Individual (no team flag) ranks higher than team
    return (a.team ? 1 : 0) - (b.team ? 1 : 0);
  });
};

// Games emblems component for the dedicated column
const GamesEmblems = ({ history }: { history?: GamesEntry[] }) => {
  if (!history || history.length === 0) return null;
  
  const sorted = sortGamesEntries(history);
  
  return (
    <div className="flex items-center" title={`${history.length} Games appearances`}>
      {sorted.slice(0, 6).map((entry, idx) => (
        <GamesEmblem key={idx} entry={entry} index={idx} />
      ))}
    </div>
  );
};

const ITEMS_PER_PAGE = 10;

const CompetitionDetail = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState(mockCompetition);
  const [selectedDivision, setSelectedDivision] = useState("Elite Women");
  const [currentPage, setCurrentPage] = useState(1);
  const leaderboard = leaderboards[selectedDivision] || [];
  const { isAdmin, isAdminMode, toggleAdminMode, login, logout } = useAdmin();

  const updateCompetitionField = (field: string, value: string) => {
    setCompetition((prev) => ({ ...prev, [field]: value }));
  };

  // Sort athletes: ranked first (by rank), DNF at bottom
  const sortedLeaderboard = useMemo(() => {
    const ranked = leaderboard.filter((a) => a.rank !== "DNF");
    const dnf = leaderboard.filter((a) => a.rank === "DNF");
    return [...ranked.sort((a, b) => (a.rank as number) - (b.rank as number)), ...dnf];
  }, [leaderboard]);

  // Pagination logic
  const totalPages = Math.ceil(sortedLeaderboard.length / ITEMS_PER_PAGE);
  const paginatedLeaderboard = sortedLeaderboard.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when division changes
  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      {/* Dev Admin Toggle - Top Right Corner */}
      <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
        <Shield className={`h-4 w-4 ${isAdmin && isAdminMode ? 'text-primary' : 'text-muted-foreground'}`} />
        <span className="text-xs font-medium text-muted-foreground">Admin</span>
        <Switch
          checked={isAdmin && isAdminMode}
          onCheckedChange={() => {
            if (!isAdmin) {
              login();
              toggleAdminMode();
            } else if (isAdminMode) {
              logout();
            } else {
              toggleAdminMode();
            }
          }}
        />
      </div>

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
          <EditableText
            value={competition.name}
            onSave={(val) => updateCompetitionField("name", val)}
            as="h1"
            className="text-3xl font-bold text-foreground mb-3"
            entityType="competition"
            entityId={competition.id}
            entityName={competition.name}
            fieldName="name"
          />
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

        {/* Admin Panel */}
        <CompetitionAdminPanel 
          competitionId={competition.id} 
          competitionName={competition.name} 
        />

        {/* Competition Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Venue
            </div>
            <EditableText
              value={competition.venue}
              onSave={(val) => updateCompetitionField("venue", val)}
              className="text-sm font-medium text-foreground"
              entityType="competition"
              entityId={competition.id}
              entityName={competition.name}
              fieldName="venue"
            />
          </div>
          <div className="border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Prize Purse
            </div>
            <EditableText
              value={competition.prizePurse}
              onSave={(val) => updateCompetitionField("prizePurse", val)}
              className="text-sm font-medium text-foreground"
              entityType="competition"
              entityId={competition.id}
              entityName={competition.name}
              fieldName="prize purse"
            />
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
        <div className="mb-8">
          <Tabs value={selectedDivision} onValueChange={handleDivisionChange}>
            {/* Elite */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-4 w-4 text-foreground" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Elite</span>
                <span className="text-xs text-muted-foreground">— Unrestricted</span>
              </div>
              <TabsList className="h-auto p-1 bg-muted/50 inline-flex gap-1">
                <TabsTrigger value="Elite Men" className="px-4 py-2 text-sm">Men</TabsTrigger>
                <TabsTrigger value="Elite Women" className="px-4 py-2 text-sm">Women</TabsTrigger>
              </TabsList>
            </div>

            {/* Intermediate */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Medal className="h-4 w-4 text-foreground" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Intermediate</span>
                <span className="text-xs text-muted-foreground">— Second tier</span>
              </div>
              <TabsList className="h-auto p-1 bg-muted/50 inline-flex gap-1">
                <TabsTrigger value="Intermediate Men" className="px-4 py-2 text-sm">Men</TabsTrigger>
                <TabsTrigger value="Intermediate Women" className="px-4 py-2 text-sm">Women</TabsTrigger>
              </TabsList>
            </div>

            {/* Masters */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-foreground" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Masters</span>
                <span className="text-xs text-muted-foreground">— Age-restricted divisions</span>
              </div>
              <TabsList className="h-auto p-1 bg-muted/50 inline-flex gap-1">
                <TabsTrigger value="Masters 35-39" className="px-4 py-2 text-sm">35-39</TabsTrigger>
                <TabsTrigger value="Masters 40-44" className="px-4 py-2 text-sm">40-44</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
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
                  <TableHead className="w-14 hidden sm:table-cell"></TableHead>
                  <TableHead className="w-14 hidden sm:table-cell"></TableHead>
                  <TableHead className="w-24 hidden sm:table-cell"></TableHead>
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
                {paginatedLeaderboard.map((athlete) => (
                  <TableRow key={athlete.athleteId} className={athlete.rank === "DNF" ? "opacity-60" : ""}>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                          athlete.rank === 1
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : athlete.rank === 2
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            : athlete.rank === 3
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                            : athlete.rank === "DNF"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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
                    <TableCell className="hidden sm:table-cell">
                      <RankBadge rank={athlete.worldRank} icon="🌍" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <RankBadge rank={athlete.nationalRank} icon={athlete.flag} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <GamesEmblems history={athlete.gamesHistory} />
                    </TableCell>
                    <TableCell className="text-center font-bold text-foreground">
                      {athlete.points ?? "—"}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first, last, current, and adjacent pages
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

          <p className="text-xs text-muted-foreground mt-3">
            E1-E4 = Individual event placements • Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedLeaderboard.length)} of {sortedLeaderboard.length} athletes
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompetitionDetail;
