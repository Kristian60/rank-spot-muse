import { Search, Menu } from "lucide-react";

const navItems = [
  { label: "STANDINGS", href: "#", active: true },
  { label: "SCORES", href: "#" },
  { label: "SCHEDULE", href: "#" },
  { label: "STATS", href: "#" },
  { label: "TEAMS", href: "#" },
  { label: "PLAYERS", href: "#" },
];

export function Header() {
  return (
    <header className="bg-header text-header-foreground sticky top-0 z-50">
      <div className="container flex items-center justify-between h-12">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 hover:bg-white/10 rounded transition-colors">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-header font-black text-xs">SR</span>
              </div>
              <span className="font-black text-lg tracking-tight hidden sm:block">SPORTS RANKINGS</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-4 text-xs font-bold tracking-wide transition-colors hover:bg-white/10 ${
                  item.active 
                    ? "text-white border-b-2 border-white" 
                    : "text-white/80"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-header-foreground/50" />
            <input
              type="search"
              placeholder="Search..."
              className="h-8 w-40 rounded bg-white/10 border-0 pl-8 pr-3 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
          <button className="sm:hidden p-2 hover:bg-white/10 rounded transition-colors">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
