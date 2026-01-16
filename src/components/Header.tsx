import { Moon, Sun, User, Menu, Shield, LogOut, Settings } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const navItems = [
  { label: "Rankings", href: "/rankings" },
  { label: "Athletes", href: "#" },
  { label: "Competitions", href: "#" },
  { label: "Schedule", href: "#" },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAdmin, isAdminMode, toggleAdminMode, login, logout } = useAdmin();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      return; // In real app, show error
    }
    // Mock login/signup - in real app this would check credentials or create account
    login();
    setLoginOpen(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSignUp(false);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

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

            {/* Profile Icon with Login Dialog */}
            {isAdmin ? (
              <Tooltip>
                <TooltipTrigger asChild>
                <button
                    onClick={logout}
                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
                    aria-label="Logout"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logged in as Admin - Click to logout</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                <button
                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors duration-150"
                    aria-label="Login"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isSignUp ? "Create account" : "Sign in"}</DialogTitle>
                    <DialogDescription>
                      {isSignUp 
                        ? "Enter your details to create a new account" 
                        : "Enter your credentials to access your account"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {isSignUp && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    <Button type="submit" className="w-full">
                      {isSignUp ? "Create account" : "Sign in"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      {isSignUp ? (
                        <>
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => { setIsSignUp(false); resetForm(); }}
                            className="text-primary hover:underline"
                          >
                            Sign in
                          </button>
                        </>
                      ) : (
                        <>
                          Don't have an account?{" "}
                          <button
                            type="button"
                            onClick={() => { setIsSignUp(true); resetForm(); }}
                            className="text-primary hover:underline"
                          >
                            Sign up
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            
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
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setLoginOpen(true);
                    }}
                    className="flex items-center gap-3 px-3 py-3 w-full text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                  >
                    <User className="h-5 w-5" />
                    Sign in
                  </button>
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
