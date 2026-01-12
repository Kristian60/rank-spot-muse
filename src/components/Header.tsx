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
    <header className="border-b-2 border-border bg-card">
      <div className="container flex items-center h-12">
        <div className="flex items-center gap-8 flex-1">
          <h1 className="text-sm font-semibold tracking-tight">RANKINGS</h1>
          <nav className="hidden md:flex items-center h-full">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`h-full flex items-center px-4 text-sm transition-colors duration-100 border-b-2 -mb-[2px] ${
                  item.active 
                    ? "text-foreground border-primary font-medium" 
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-field"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search teams..."
              className="carbon-input w-52 pl-10"
            />
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="h-12 w-12 flex items-center justify-center hover:bg-field transition-colors duration-100"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
