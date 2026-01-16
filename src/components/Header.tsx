import { Moon, Sun, User, Menu, Shield, LogOut, Settings, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchDropdown } from "./SearchDropdown";
import { useAdmin } from "@/contexts/AdminContext";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Rankings", href: "/rankings" },
  { label: "Athletes", href: "#" },
  { label: "Competitions", href: "#" },
  { label: "Schedule", href: "#" },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isAdminMode, toggleAdminMode, login, logout } = useAdmin();

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
            <SearchDropdown 
              className="hidden md:block"
              inputClassName="h-9 w-56 pl-9 pr-3 rounded-lg bg-transparent border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
            />
            
            {/* Admin Edit Mode Toggle - only visible when logged in as admin */}
            {isAdmin && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-lg border border-border">
                    <Shield className={`h-4 w-4 ${isAdminMode ? "text-primary" : "text-muted-foreground"}`} />
                    <Switch
                      checked={isAdminMode}
                      onCheckedChange={toggleAdminMode}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Admin Edit Mode</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-9 flex items-center gap-1 px-2 rounded-lg hover:bg-secondary transition-colors duration-150"
                  aria-label="Profile menu"
                >
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center ${isAdmin ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <User className="h-4 w-4" />
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAdmin ? (
                  <>
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">admin@baserank.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={login} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Sign in
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={login} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Sign in as Admin
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Dark mode toggle - desktop only */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
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
              <SheetContent
                side="right"
                className="w-72"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="text-lg font-bold">Baserank</SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <div className="mt-6">
                  <SearchDropdown 
                    onSelect={() => setIsOpen(false)}
                    inputClassName="h-10 w-full pl-9 pr-3 rounded-lg bg-transparent border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
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

                {/* Admin toggle and Dark mode in sidebar */}
                <div className="mt-6 pt-6 border-t border-border space-y-1">
                  {isAdmin && (
                    <>
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 w-full text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                      >
                        <Settings className="h-5 w-5" />
                        Admin Dashboard
                      </Link>
                      <div className="flex items-center justify-between px-3 py-3 rounded-lg">
                        <div className="flex items-center gap-3 text-base text-muted-foreground">
                          <Shield className={`h-5 w-5 ${isAdminMode ? "text-primary" : ""}`} />
                          Admin Mode
                        </div>
                        <Switch
                          checked={isAdminMode}
                          onCheckedChange={toggleAdminMode}
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                    </>
                  )}
                  {isAdmin ? (
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-3 py-3 w-full text-base text-destructive hover:bg-secondary rounded-lg transition-colors duration-150"
                    >
                      <LogOut className="h-5 w-5" />
                      Log out
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={login}
                        className="flex items-center gap-3 px-3 py-3 w-full text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                      >
                        <User className="h-5 w-5" />
                        Sign in
                      </button>
                      <button
                        onClick={login}
                        className="flex items-center gap-3 px-3 py-3 w-full text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                      >
                        <User className="h-5 w-5" />
                        Sign in as Admin
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="flex items-center gap-3 px-3 py-3 w-full text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                  >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
