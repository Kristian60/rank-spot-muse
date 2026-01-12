interface Competition {
  name: string;
  date: string;
  location: string;
  men: { rank: number; name: string; country: string; flag: string }[];
  women: { rank: number; name: string; country: string; flag: string }[];
}

const competitions: Competition[] = [
  {
    name: "CrossFit Games",
    date: "Aug 2024",
    location: "Fort Worth, TX",
    men: [
      { rank: 1, name: "James Sprague", country: "USA", flag: "🇺🇸" },
      { rank: 2, name: "Dallin Pepper", country: "USA", flag: "🇺🇸" },
      { rank: 3, name: "Brent Fikowski", country: "CAN", flag: "🇨🇦" },
    ],
    women: [
      { rank: 1, name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺" },
      { rank: 2, name: "Laura Horvath", country: "HUN", flag: "🇭🇺" },
      { rank: 3, name: "Haley Adams", country: "USA", flag: "🇺🇸" },
    ],
  },
  {
    name: "Rogue Invitational",
    date: "Oct 2024",
    location: "Austin, TX",
    men: [
      { rank: 1, name: "Patrick Vellner", country: "CAN", flag: "🇨🇦" },
      { rank: 2, name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦" },
      { rank: 3, name: "Roman Khrennikov", country: "RUS", flag: "🇷🇺" },
    ],
    women: [
      { rank: 1, name: "Emma Lawson", country: "CAN", flag: "🇨🇦" },
      { rank: 2, name: "Gabriela Migała", country: "POL", flag: "🇵🇱" },
      { rank: 3, name: "Alexis Raptis", country: "USA", flag: "🇺🇸" },
    ],
  },
  {
    name: "Dubai CrossFit Championship",
    date: "Dec 2024",
    location: "Dubai, UAE",
    men: [
      { rank: 1, name: "Brent Fikowski", country: "CAN", flag: "🇨🇦" },
      { rank: 2, name: "Lazar Đukić", country: "SRB", flag: "🇷🇸" },
      { rank: 3, name: "Jonne Koski", country: "FIN", flag: "🇫🇮" },
    ],
    women: [
      { rank: 1, name: "Laura Horvath", country: "HUN", flag: "🇭🇺" },
      { rank: 2, name: "Brooke Wells", country: "USA", flag: "🇺🇸" },
      { rank: 3, name: "Emma Tall", country: "SWE", flag: "🇸🇪" },
    ],
  },
  {
    name: "Wodapalooza",
    date: "Jan 2025",
    location: "Miami, FL",
    men: [
      { rank: 1, name: "Jeffrey Adler", country: "CAN", flag: "🇨🇦" },
      { rank: 2, name: "James Sprague", country: "USA", flag: "🇺🇸" },
      { rank: 3, name: "Dallin Pepper", country: "USA", flag: "🇺🇸" },
    ],
    women: [
      { rank: 1, name: "Tia-Clair Toomey", country: "AUS", flag: "🇦🇺" },
      { rank: 2, name: "Emma Lawson", country: "CAN", flag: "🇨🇦" },
      { rank: 3, name: "Danielle Brandon", country: "USA", flag: "🇺🇸" },
    ],
  },
];

function PodiumList({ athletes, label }: { athletes: { rank: number; name: string; flag: string }[]; label: string }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground uppercase tracking-widest mb-2">{label}</div>
      <div className="space-y-1.5">
        {athletes.map((athlete, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-4 text-muted-foreground text-xs">{i + 1}.</span>
            <span className="text-sm">{athlete.flag}</span>
            <span className="text-foreground">{athlete.name}</span>
          </div>
        ))}
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
        {competitions.map((comp) => (
          <div key={comp.name} className="border border-border rounded-lg p-5">
            <div className="mb-5">
              <h3 className="font-medium text-foreground">{comp.name}</h3>
              <p className="text-sm text-muted-foreground">{comp.date} · {comp.location}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <PodiumList athletes={comp.men} label="Men" />
              <PodiumList athletes={comp.women} label="Women" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
