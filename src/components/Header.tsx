import { Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Rankings", href: "#", active: true },
  { label: "Teams", href: "#" },
  { label: "Players", href: "#" },
  { label: "Matches", href: "#" },
  { label: "Statistics", href: "#" },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="container py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-medium tracking-tight text-primary">RANKINGS</h1>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  item.active 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search teams..."
              className="h-10 w-56 rounded-sm bg-secondary pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 hover:bg-secondary rounded-full transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
