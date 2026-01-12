import { Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Standings", href: "#", active: true },
  { label: "Teams", href: "#" },
  { label: "Players", href: "#" },
  { label: "Schedule", href: "#" },
  { label: "Stats", href: "#" },
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
    <header className="bg-transparent">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Standings</h1>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                  item.active 
                    ? "text-primary font-medium bg-primary/5" 
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
              placeholder="Search..."
              className="mat-input w-48 pl-9"
            />
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
