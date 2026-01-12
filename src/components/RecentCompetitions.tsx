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

function PodiumAthlete({ athlete, position }: { athlete: { name: string; country: string; flag: string }; position: 1 | 2 | 3 }) {
  const heights = { 1: "h-16", 2: "h-12", 3: "h-10" };
  const order = { 1: "order-2", 2: "order-1", 3: "order-3" };
  const colors = { 1: "bg-amber-400", 2: "bg-gray-300", 3: "bg-amber-600" };
  
  return (
    <div className={`flex flex-col items-center ${order[position]}`}>
      <span className="text-xs mb-1">{athlete.flag}</span>
      <span className="text-xs font-medium text-foreground truncate max-w-[80px] text-center">{athlete.name.split(' ')[1] || athlete.name}</span>
      <div className={`w-12 ${heights[position]} ${colors[position]} flex items-center justify-center text-xs font-bold text-foreground/80 mt-1 rounded-t`}>
        {position}
      </div>
    </div>
  );
}

export function RecentCompetitions() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="section-header">Recent Competitions</h2>
        <p className="section-subheader">Podium finishes from the last 4 major events</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {competitions.map((comp) => (
          <div key={comp.name} className="border border-border rounded-lg p-4">
            <div className="mb-4">
              <h3 className="font-medium text-foreground text-sm">{comp.name}</h3>
              <p className="text-xs text-muted-foreground">{comp.date} · {comp.location}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Men</div>
                <div className="flex items-end justify-center gap-1">
                  <PodiumAthlete athlete={comp.men[1]} position={2} />
                  <PodiumAthlete athlete={comp.men[0]} position={1} />
                  <PodiumAthlete athlete={comp.men[2]} position={3} />
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Women</div>
                <div className="flex items-end justify-center gap-1">
                  <PodiumAthlete athlete={comp.women[1]} position={2} />
                  <PodiumAthlete athlete={comp.women[0]} position={1} />
                  <PodiumAthlete athlete={comp.women[2]} position={3} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
