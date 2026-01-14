import { useState, useEffect, useRef } from "react";
import { Search, User, Trophy, Building2, Dumbbell, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  name: string;
  subtitle?: string;
}

interface SearchResults {
  athletes: SearchResult[];
  competitions: SearchResult[];
  sponsors: SearchResult[];
  gyms: SearchResult[];
  coaches: SearchResult[];
}

// Mock data - replace with actual API calls when backend is connected
const mockData = {
  athletes: [
    { id: "1", name: "Tia-Clair Toomey", subtitle: "Australia • Rank #1" },
    { id: "2", name: "Laura Horvath", subtitle: "Hungary • Rank #2" },
    { id: "3", name: "Justin Medeiros", subtitle: "USA • Rank #1" },
    { id: "4", name: "Ricky Garard", subtitle: "Australia • Rank #2" },
    { id: "5", name: "Emma Lawson", subtitle: "Canada • Rank #3" },
    { id: "6", name: "Roman Khrennikov", subtitle: "Russia • Rank #3" },
  ],
  competitions: [
    { id: "1", name: "CrossFit Games 2024", subtitle: "Fort Worth, TX" },
    { id: "2", name: "Rogue Invitational 2024", subtitle: "Austin, TX" },
    { id: "3", name: "Dubai CrossFit Championship", subtitle: "Dubai, UAE" },
    { id: "4", name: "Wodapalooza 2024", subtitle: "Miami, FL" },
    { id: "5", name: "Torian Pro 2024", subtitle: "Brisbane, Australia" },
  ],
  sponsors: [
    { id: "nobull", name: "NOBULL", subtitle: "Footwear & Apparel" },
    { id: "rogue", name: "Rogue Fitness", subtitle: "Equipment" },
    { id: "nike", name: "Nike", subtitle: "Footwear & Apparel" },
    { id: "reebok", name: "Reebok", subtitle: "Footwear & Apparel" },
    { id: "goruck", name: "GORUCK", subtitle: "Gear & Apparel" },
  ],
  gyms: [
    { id: "mayhem", name: "CrossFit Mayhem", subtitle: "Cookeville, TN" },
    { id: "invictus", name: "CrossFit Invictus", subtitle: "San Diego, CA" },
    { id: "tttr", name: "TTTR Training", subtitle: "Brisbane, Australia" },
    { id: "crossfit-krypton", name: "CrossFit Krypton", subtitle: "Budapest, Hungary" },
    { id: "brute-strength", name: "Brute Strength", subtitle: "Online" },
  ],
  coaches: [
    { id: "shane-orr", name: "Shane Orr", subtitle: "CrossFit Mayhem" },
    { id: "ben-bergeron", name: "Ben Bergeron", subtitle: "CompTrain" },
    { id: "harry-palley", name: "Harry Palley", subtitle: "Brute Strength" },
    { id: "tia-clair", name: "Tia-Clair Toomey", subtitle: "PRVN Fitness" },
    { id: "james-fitzgerald", name: "James Fitzgerald", subtitle: "OPEX Fitness" },
  ],
};

function searchMockData(query: string): SearchResults {
  const lowerQuery = query.toLowerCase();
  
  return {
    athletes: mockData.athletes.filter(a => 
      a.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 5),
    competitions: mockData.competitions.filter(c => 
      c.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 3),
    sponsors: mockData.sponsors.filter(s => 
      s.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 3),
    gyms: mockData.gyms.filter(g => 
      g.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 3),
    coaches: mockData.coaches.filter(c => 
      c.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 3),
  };
}

interface SearchDropdownProps {
  className?: string;
  inputClassName?: string;
  onSelect?: () => void;
}

export function SearchDropdown({ className = "", inputClassName = "", onSelect }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length >= 4) {
      // Debounce search
      const timer = setTimeout(() => {
        const searchResults = searchMockData(query);
        setResults(searchResults);
        setIsOpen(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setResults(null);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type: string, id: string) => {
    setQuery("");
    setIsOpen(false);
    onSelect?.();
    
    switch (type) {
      case "athlete":
        navigate(`/athlete/${id}`);
        break;
      case "competition":
        navigate(`/competition/${id}`);
        break;
      case "sponsor":
        navigate(`/sponsor/${id}`);
        break;
      case "gym":
        navigate(`/gym/${id}`);
        break;
      case "coach":
        navigate(`/coach/${id}`);
        break;
    }
  };

  const hasResults = results && (
    results.athletes.length > 0 ||
    results.competitions.length > 0 ||
    results.sponsors.length > 0 ||
    results.gyms.length > 0 ||
    results.coaches.length > 0
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 4 && results && setIsOpen(true)}
        placeholder="Search..."
        className={inputClassName}
      />
      
      {isOpen && results && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {!hasResults ? (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <>
              {/* Athletes */}
              {results.athletes.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      <User className="h-3 w-3" />
                      Athletes
                    </div>
                  </div>
                  {results.athletes.map((athlete) => (
                    <button
                      key={athlete.id}
                      onClick={() => handleSelect("athlete", athlete.id)}
                      className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex flex-col"
                    >
                      <span className="text-sm font-medium text-foreground">{athlete.name}</span>
                      {athlete.subtitle && (
                        <span className="text-xs text-muted-foreground">{athlete.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Competitions */}
              {results.competitions.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-muted/50 border-b border-border border-t">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      <Trophy className="h-3 w-3" />
                      Competitions
                    </div>
                  </div>
                  {results.competitions.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleSelect("competition", comp.id)}
                      className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex flex-col"
                    >
                      <span className="text-sm font-medium text-foreground">{comp.name}</span>
                      {comp.subtitle && (
                        <span className="text-xs text-muted-foreground">{comp.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Sponsors */}
              {results.sponsors.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-muted/50 border-b border-border border-t">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      <Building2 className="h-3 w-3" />
                      Sponsors
                    </div>
                  </div>
                  {results.sponsors.map((sponsor) => (
                    <button
                      key={sponsor.id}
                      onClick={() => handleSelect("sponsor", sponsor.id)}
                      className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex flex-col"
                    >
                      <span className="text-sm font-medium text-foreground">{sponsor.name}</span>
                      {sponsor.subtitle && (
                        <span className="text-xs text-muted-foreground">{sponsor.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Gyms */}
              {results.gyms.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-muted/50 border-b border-border border-t">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      <Dumbbell className="h-3 w-3" />
                      Gyms
                    </div>
                  </div>
                  {results.gyms.map((gym) => (
                    <button
                      key={gym.id}
                      onClick={() => handleSelect("gym", gym.id)}
                      className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex flex-col"
                    >
                      <span className="text-sm font-medium text-foreground">{gym.name}</span>
                      {gym.subtitle && (
                        <span className="text-xs text-muted-foreground">{gym.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Coaches */}
              {results.coaches.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-muted/50 border-b border-border border-t">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      <Users className="h-3 w-3" />
                      Coaches
                    </div>
                  </div>
                  {results.coaches.map((coach) => (
                    <button
                      key={coach.id}
                      onClick={() => handleSelect("coach", coach.id)}
                      className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex flex-col"
                    >
                      <span className="text-sm font-medium text-foreground">{coach.name}</span>
                      {coach.subtitle && (
                        <span className="text-xs text-muted-foreground">{coach.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
