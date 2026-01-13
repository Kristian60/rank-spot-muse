import { Search, Moon, Sun, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Athletes", href: "#" },
  { label: "Competitions", href: "#" },
  { label: "Schedule", href: "#" },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          {/* Desktop Navigation */}
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
            {/* Search - hidden on mobile */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-44 pl-9 pr-3 rounded-lg bg-transparent border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
              />
            </div>
            
            {/* Desktop-only icons */}
            <button
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
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

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-muted-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-lg font-bold">Baserank</SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <div className="relative mt-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-full pl-9 pr-3 rounded-lg bg-transparent border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-1 mt-6">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Profile */}
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
