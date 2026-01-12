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
    <header className="container">
      <div className="flex items-center justify-between h-14">
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
              className="h-8 w-48 border-b border-border bg-transparent pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-muted rounded transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
