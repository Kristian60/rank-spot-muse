// For individuals: single member array. For teams: 2-4 members
interface Competitor {
  rank: number;
  members: { name: string; country: string; flag: string }[];
}

interface Competition {
  name: string;
  date: string;
  location: string;
  format: "individual" | "team-2" | "team-3" | "team-4";
  men: Competitor[];
  women: Competitor[];
}

const competitions: Competition[] = [
  {
    name: "CrossFit Games",
    date: "Aug 2024",
    location: "Fort Worth, TX",
    format: "individual",
    men: [
      { rank: 1, members: [{ name: "James Sprague", country: "USA", flag: "🇺🇸" }] },
      { rank: 2, members: [{ name: "Dallin Pepper", country: "USA", flag: "🇺🇸" }] },
      { rank: 3, members: [{ name: "Brent Fikowski", country: "CAN", flag: "🇨🇦" }] },
    ],
    women: [
      { rank: 1, members: [{ name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺" }] },
      { rank: 2, members: [{ name: "Laura Horvath", country: "HUN", flag: "🇭🇺" }] },
      { rank: 3, members: [{ name: "Alexandrina-Konstantina Papadopoulos", country: "GRE", flag: "🇬🇷" }] },
    ],
  },
  {
    name: "Rogue Invitational",
    date: "Oct 2024",
    location: "Austin, TX",
    format: "team-2",
    men: [
      { rank: 1, members: [{ name: "Patrick Vellner", country: "CAN", flag: "🇨🇦" }, { name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦" }] },
      { rank: 2, members: [{ name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺" }, { name: "Jonne Koski", country: "FIN", flag: "🇫🇮" }] },
      { rank: 3, members: [{ name: "Dallin Pepper", country: "USA", flag: "🇺🇸" }, { name: "James Sprague", country: "USA", flag: "🇺🇸" }] },
    ],
    women: [
      { rank: 1, members: [{ name: "Emma Lawson", country: "CAN", flag: "🇨🇦" }, { name: "Gabriela Migała", country: "POL", flag: "🇵🇱" }] },
      { rank: 2, members: [{ name: "Alexis Raptis", country: "USA", flag: "🇺🇸" }, { name: "Brooke Wells", country: "USA", flag: "🇺🇸" }] },
      { rank: 3, members: [{ name: "Laura Horvath", country: "HUN", flag: "🇭🇺" }, { name: "Bartholomew-Christensen", country: "DEN", flag: "🇩🇰" }] },
    ],
  },
  {
    name: "Dubai Championship",
    date: "Dec 2024",
    location: "Dubai, UAE",
    format: "team-3",
    men: [
      { rank: 1, members: [{ name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦" }, { name: "James Sprague", country: "USA", flag: "🇺🇸" }, { name: "Dallin Pepper", country: "USA", flag: "🇺🇸" }] },
      { rank: 2, members: [{ name: "Brent Fikowski", country: "CAN", flag: "🇨🇦" }, { name: "Patrick Vellner", country: "CAN", flag: "🇨🇦" }, { name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺" }] },
      { rank: 3, members: [{ name: "Lazar Đukić", country: "SRB", flag: "🇷🇸" }, { name: "Jonne Koski", country: "FIN", flag: "🇫🇮" }, { name: "Saxon Panchik", country: "USA", flag: "🇺🇸" }] },
    ],
    women: [
      { rank: 1, members: [{ name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺" }, { name: "Emma Lawson", country: "CAN", flag: "🇨🇦" }, { name: "Danielle Brandon", country: "USA", flag: "🇺🇸" }] },
      { rank: 2, members: [{ name: "Laura Horvath", country: "HUN", flag: "🇭🇺" }, { name: "Gabriela Migała", country: "POL", flag: "🇵🇱" }, { name: "Haley Adams", country: "USA", flag: "🇺🇸" }] },
      { rank: 3, members: [{ name: "Alexis Raptis", country: "USA", flag: "🇺🇸" }, { name: "Brooke Wells", country: "USA", flag: "🇺🇸" }, { name: "Emma Tall", country: "SWE", flag: "🇸🇪" }] },
    ],
  },
  {
    name: "Wodapalooza",
    date: "Jan 2025",
    location: "Miami, FL",
    format: "team-4",
    men: [
      { rank: 1, members: [{ name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦" }, { name: "James Sprague", country: "USA", flag: "🇺🇸" }, { name: "Dallin Pepper", country: "USA", flag: "🇺🇸" }, { name: "Saxon Panchik", country: "USA", flag: "🇺🇸" }] },
      { rank: 2, members: [{ name: "Brent Fikowski", country: "CAN", flag: "🇨🇦" }, { name: "Patrick Vellner", country: "CAN", flag: "🇨🇦" }, { name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺" }, { name: "Jonne Koski", country: "FIN", flag: "🇫🇮" }] },
      { rank: 3, members: [{ name: "Lazar Đukić", country: "SRB", flag: "🇷🇸" }, { name: "Cole Sager", country: "USA", flag: "🇺🇸" }, { name: "Travis Mayer", country: "USA", flag: "🇺🇸" }, { name: "Noah Ohlsen", country: "USA", flag: "🇺🇸" }] },
    ],
    women: [
      { rank: 1, members: [{ name: "Tia-Clair", country: "AUS", flag: "🇦🇺" }, { name: "Emma", country: "CAN", flag: "🇨🇦" }, { name: "Danielle", country: "USA", flag: "🇺🇸" }, { name: "Haley", country: "USA", flag: "🇺🇸" }] },
      { rank: 2, members: [{ name: "Laura", country: "HUN", flag: "🇭🇺" }, { name: "Gabriela", country: "POL", flag: "🇵🇱" }, { name: "Alexis", country: "USA", flag: "🇺🇸" }, { name: "Brooke", country: "USA", flag: "🇺🇸" }] },
      { rank: 3, members: [{ name: "Emma Tall", country: "SWE", flag: "🇸🇪" }, { name: "Kristín Holte", country: "NOR", flag: "🇳🇴" }, { name: "Annie Thorisdottir", country: "ISL", flag: "🇮🇸" }, { name: "Sara Sigmundsdottir", country: "ISL", flag: "🇮🇸" }] },
    ],
  },
];

function getFormatLabel(format: Competition["format"]) {
  switch (format) {
    case "individual": return null;
    case "team-2": return "Pairs";
    case "team-3": return "Trios";
    case "team-4": return "Quads";
  }
}

const medalColors = [
  "bg-amber-400/20 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
  "bg-slate-300/30 text-slate-500 dark:bg-slate-400/10 dark:text-slate-400",
  "bg-orange-300/20 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
];

function PodiumList({ competitors, label }: { competitors: Competitor[]; label: string }) {
  return (
    <div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3 font-medium">{label}</div>
      <div className="space-y-2">
        {competitors.map((competitor, i) => {
          const isTeam = competitor.members.length > 1;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${medalColors[i]}`}>
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                {isTeam ? (
                  <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                    {competitor.members.map((m, idx) => (
                      <span key={idx} className="inline-flex items-center text-sm">
                        <span className="mr-1 text-xs">{m.flag}</span>
                        <span className="text-foreground">{m.name.split(' ')[0]}</span>
                        {idx < competitor.members.length - 1 && (
                          <span className="text-muted-foreground/40 ml-1">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="text-xs">{competitor.members[0].flag}</span>
                    <span className="text-foreground">{competitor.members[0].name}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RecentCompetitions() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="section-header">Recent Competitions</h2>
        <p className="section-subheader">Podium finishes from the last 4 major events</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {competitions.map((comp) => {
          const formatLabel = getFormatLabel(comp.format);
          return (
            <div key={comp.name} className="border border-border rounded-lg p-5">
              <div className="mb-5">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{comp.name}</h3>
                  {formatLabel && (
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                      {formatLabel}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{comp.date} · {comp.location}</p>
              </div>
              
              <div className="space-y-4">
                <PodiumList competitors={comp.men} label="Men" />
                <div className="border-t border-border pt-4">
                  <PodiumList competitors={comp.women} label="Women" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
