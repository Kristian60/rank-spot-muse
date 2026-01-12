import { Search } from "lucide-react";

const navItems = [
  { label: "Rankings", href: "#", active: true },
  { label: "Teams", href: "#" },
  { label: "Players", href: "#" },
  { label: "Matches", href: "#" },
  { label: "Statistics", href: "#" },
];

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-bold tracking-tight">RANKINGS</h1>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  item.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search teams..."
              className="h-8 w-48 rounded border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
