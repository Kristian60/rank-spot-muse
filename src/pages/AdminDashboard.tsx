import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Settings, 
  Users, 
  Trophy, 
  Shield, 
  Bell, 
  Database, 
  Eye, 
  Trash2, 
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  History,
  RotateCcw,
  User,
  FileText
} from "lucide-react";
import { Header } from "@/components/Header";
import { useAdmin } from "@/contexts/AdminContext";
import { useActivityLog, ActivityLogEntry } from "@/contexts/ActivityLogContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SettingsSection = "general" | "athletes" | "competitions" | "access" | "notifications" | "activity" | "danger";

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface ActionItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  variant?: "default" | "destructive";
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { logs, revertLog } = useActivityLog();
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  // Mock toggle states
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    publicProfiles: true,
    autoRankings: true,
    emailNotifications: true,
    slackNotifications: false,
    maintenanceMode: false,
    debugMode: false,
    allowRegistration: true,
    requireApproval: false,
    showInactiveAthletes: false,
    autoArchive: true,
  });

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "general" as const, label: "General", icon: Settings },
    { id: "athletes" as const, label: "Athletes", icon: Users },
    { id: "competitions" as const, label: "Competitions", icon: Trophy },
    { id: "access" as const, label: "Access & Security", icon: Shield },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "activity" as const, label: "Activity Log", icon: History },
    { id: "danger" as const, label: "Danger Zone", icon: AlertTriangle, danger: true },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <SettingsPanel title="General Settings" description="Configure general platform behavior.">
            <ToggleGroup>
              <ToggleItem
                label="Public athlete profiles"
                description="Allow anyone to view athlete profiles without logging in."
                checked={toggles.publicProfiles}
                onCheckedChange={() => handleToggle("publicProfiles")}
              />
              <ToggleItem
                label="Automatic rankings calculation"
                description="Automatically recalculate rankings when new results are added."
                checked={toggles.autoRankings}
                onCheckedChange={() => handleToggle("autoRankings")}
              />
              <ToggleItem
                label="Maintenance mode"
                description="Put the site in maintenance mode. Only admins can access."
                checked={toggles.maintenanceMode}
                onCheckedChange={() => handleToggle("maintenanceMode")}
                warning={toggles.maintenanceMode}
              />
              <ToggleItem
                label="Debug mode"
                description="Enable detailed logging and debug information."
                checked={toggles.debugMode}
                onCheckedChange={() => handleToggle("debugMode")}
              />
            </ToggleGroup>

            <Separator className="my-6" />

            <ActionGroup title="Data Management">
              <ActionButton
                icon={Download}
                label="Export all data"
                description="Download a complete backup of all platform data."
              />
              <ActionButton
                icon={Upload}
                label="Import data"
                description="Import data from a backup file."
              />
              <ActionButton
                icon={RefreshCw}
                label="Rebuild search index"
                description="Regenerate the search index for faster queries."
              />
            </ActionGroup>
          </SettingsPanel>
        );

      case "athletes":
        return (
          <SettingsPanel title="Athlete Settings" description="Manage athlete profiles and visibility.">
            <ToggleGroup>
              <ToggleItem
                label="Show inactive athletes"
                description="Display athletes who haven't competed in the last 12 months."
                checked={toggles.showInactiveAthletes}
                onCheckedChange={() => handleToggle("showInactiveAthletes")}
              />
              <ToggleItem
                label="Auto-archive inactive profiles"
                description="Automatically archive athletes after 24 months of inactivity."
                checked={toggles.autoArchive}
                onCheckedChange={() => handleToggle("autoArchive")}
              />
            </ToggleGroup>

            <Separator className="my-6" />

            <ActionGroup title="Bulk Actions">
              <ActionButton
                icon={Users}
                label="Merge duplicate athletes"
                description="Find and merge duplicate athlete profiles."
              />
              <ActionButton
                icon={RefreshCw}
                label="Recalculate all stats"
                description="Rebuild statistics for all athlete profiles."
              />
              <ActionButton
                icon={Eye}
                label="Review pending profiles"
                description="Review athlete profiles awaiting approval."
                badge="3"
              />
            </ActionGroup>
          </SettingsPanel>
        );

      case "competitions":
        return (
          <SettingsPanel title="Competition Settings" description="Configure competition management.">
            <ToggleGroup>
              <ToggleItem
                label="Allow result corrections"
                description="Enable post-competition result corrections by organizers."
                checked={true}
                onCheckedChange={() => {}}
              />
              <ToggleItem
                label="Require division verification"
                description="Require age/weight verification for division eligibility."
                checked={true}
                onCheckedChange={() => {}}
              />
            </ToggleGroup>

            <Separator className="my-6" />

            <ActionGroup title="Competition Management">
              <ActionButton
                icon={Trophy}
                label="Import competition results"
                description="Bulk import results from external sources."
              />
              <ActionButton
                icon={Database}
                label="Sync with official rankings"
                description="Synchronize data with official federation rankings."
              />
            </ActionGroup>
          </SettingsPanel>
        );

      case "access":
        return (
          <SettingsPanel title="Access & Security" description="Manage user access and security settings.">
            <ToggleGroup>
              <ToggleItem
                label="Allow new registrations"
                description="Allow new users to create accounts."
                checked={toggles.allowRegistration}
                onCheckedChange={() => handleToggle("allowRegistration")}
              />
              <ToggleItem
                label="Require admin approval"
                description="New accounts require admin approval before activation."
                checked={toggles.requireApproval}
                onCheckedChange={() => handleToggle("requireApproval")}
              />
            </ToggleGroup>

            <Separator className="my-6" />

            <ActionGroup title="Access Management">
              <ActionButton
                icon={Users}
                label="Manage admin users"
                description="Add or remove administrator privileges."
              />
              <ActionButton
                icon={Shield}
                label="View access logs"
                description="Review recent admin actions and login attempts."
              />
            </ActionGroup>
          </SettingsPanel>
        );

      case "notifications":
        return (
          <SettingsPanel title="Notifications" description="Configure notification preferences.">
            <ToggleGroup>
              <ToggleItem
                label="Email notifications"
                description="Send email notifications for important events."
                checked={toggles.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
              <ToggleItem
                label="Slack integration"
                description="Post updates to a Slack channel."
                checked={toggles.slackNotifications}
                onCheckedChange={() => handleToggle("slackNotifications")}
              />
            </ToggleGroup>
          </SettingsPanel>
        );

      case "activity":
        return (
          <SettingsPanel title="Activity Log" description="View all admin changes and revert if needed.">
            <div className="space-y-3">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activity recorded yet.</p>
                </div>
              ) : (
                logs.map((log) => (
                  <ActivityLogItem key={log.id} log={log} onRevert={revertLog} />
                ))
              )}
            </div>
          </SettingsPanel>
        );

      case "danger":
        return (
          <SettingsPanel 
            title="Danger Zone" 
            description="Irreversible and destructive actions."
            danger
          >
            <div className="space-y-4">
              <DangerAction
                label="Reset all rankings"
                description="This will reset all athlete rankings to zero. This action cannot be undone."
                buttonText="Reset Rankings"
              />
              <DangerAction
                label="Delete all competition data"
                description="Permanently delete all competition results and history. This action cannot be undone."
                buttonText="Delete Competitions"
              />
              <DangerAction
                label="Purge inactive accounts"
                description="Permanently delete all accounts that have been inactive for more than 24 months."
                buttonText="Purge Accounts"
              />
            </div>
          </SettingsPanel>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations.</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-56 flex-shrink-0">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      activeSection === item.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                      item.danger && "text-destructive hover:text-destructive"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
}

// Sub-components

function SettingsPanel({ 
  title, 
  description, 
  children, 
  danger = false 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className={cn(
      "border rounded-lg",
      danger ? "border-destructive/50" : "border-border"
    )}>
      <div className={cn(
        "px-6 py-4 border-b",
        danger ? "border-destructive/50 bg-destructive/5" : "border-border"
      )}>
        <h2 className={cn(
          "text-base font-semibold",
          danger && "text-destructive"
        )}>{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

function ToggleGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

function ToggleItem({ 
  label, 
  description, 
  checked, 
  onCheckedChange,
  warning = false
}: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onCheckedChange: () => void;
  warning?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {warning && (
            <Badge variant="destructive" className="text-xs">Active</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function ActionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function ActionButton({ 
  icon: Icon, 
  label, 
  description,
  badge
}: { 
  icon: React.ElementType; 
  label: string; 
  description: string;
  badge?: string;
}) {
  return (
    <button className="w-full flex items-center gap-4 p-4 rounded-md border border-border hover:bg-secondary/50 transition-colors text-left group">
      <div className="p-2 rounded-md bg-secondary">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {badge && (
            <Badge variant="secondary" className="text-xs">{badge}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function DangerAction({ 
  label, 
  description, 
  buttonText 
}: { 
  label: string; 
  description: string; 
  buttonText: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-md border border-destructive/30 bg-destructive/5">
      <div className="flex-1">
        <span className="text-sm font-medium">{label}</span>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="destructive" size="sm">
        {buttonText}
      </Button>
    </div>
  );
}

function ActivityLogItem({ 
  log, 
  onRevert 
}: { 
  log: ActivityLogEntry; 
  onRevert: (id: string) => void;
}) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "edit": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "create": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "delete": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "athlete": return User;
      case "competition": return Trophy;
      default: return FileText;
    }
  };

  const EntityIcon = getEntityIcon(log.entityType);

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-lg border transition-colors",
      log.reverted 
        ? "border-border bg-muted/30 opacity-60" 
        : "border-border hover:bg-secondary/30"
    )}>
      <div className="p-2 rounded-md bg-secondary">
        <EntityIcon className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge className={cn("text-xs font-normal", getActionColor(log.action))}>
            {log.action}
          </Badge>
          <span className="text-sm font-medium">{log.entityName}</span>
          {log.field && (
            <span className="text-xs text-muted-foreground">• {log.field}</span>
          )}
          {log.reverted && (
            <Badge variant="outline" className="text-xs">Reverted</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="text-muted-foreground line-through">{log.oldValue}</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className="text-foreground">{log.newValue}</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {log.user}
          </span>
          <span>•</span>
          <span>{formatDistanceToNow(log.timestamp, { addSuffix: true })}</span>
        </div>
      </div>

      {!log.reverted && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onRevert(log.id)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Revert this change</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
