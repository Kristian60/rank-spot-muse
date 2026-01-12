import { Search, Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Athletes", href: "#" },
  { label: "Competitions", href: "#" },
  { label: "Schedule", href: "#" },
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
        <h1 className="text-xl font-bold tracking-tight text-foreground">Baserank</h1>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-44 pl-9 pr-3 rounded-lg bg-transparent border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
              />
            </div>
            
            <button
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
              aria-label="Profile"
            >
              <User className="h-5 w-5 text-muted-foreground" />
            </button>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5 text-muted-foreground" /> : <Moon className="h-5 w-5 text-muted-foreground" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
