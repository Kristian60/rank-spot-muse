import { createContext, useContext, useState, ReactNode } from "react";

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  user: string;
  action: "edit" | "create" | "delete";
  entityType: string;
  entityId: string;
  entityName: string;
  field?: string;
  oldValue: string;
  newValue: string;
  reverted?: boolean;
}

interface ActivityLogContextType {
  logs: ActivityLogEntry[];
  addLog: (entry: Omit<ActivityLogEntry, "id" | "timestamp" | "user" | "reverted">) => void;
  revertLog: (id: string) => ActivityLogEntry | undefined;
  clearLogs: () => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined);

export function ActivityLogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([
    // Mock initial data
    {
      id: "log-1",
      timestamp: new Date(Date.now() - 3600000 * 2),
      user: "admin@baserank.com",
      action: "edit",
      entityType: "athlete",
      entityId: "mat-fraser",
      entityName: "Mat Fraser",
      field: "name",
      oldValue: "Matthew Fraser",
      newValue: "Mat Fraser",
      reverted: false,
    },
    {
      id: "log-2",
      timestamp: new Date(Date.now() - 3600000 * 5),
      user: "admin@baserank.com",
      action: "edit",
      entityType: "competition",
      entityId: "rogue-2024",
      entityName: "Rogue Invitational 2024",
      field: "location",
      oldValue: "Austin, TX",
      newValue: "Dell Diamond, Austin, TX",
      reverted: false,
    },
    {
      id: "log-3",
      timestamp: new Date(Date.now() - 3600000 * 24),
      user: "editor@baserank.com",
      action: "edit",
      entityType: "athlete",
      entityId: "tia-toomey",
      entityName: "Tia-Clair Toomey",
      field: "gym",
      oldValue: "CrossFit Mayhem",
      newValue: "PRVN Fitness",
      reverted: true,
    },
  ]);

  const addLog = (entry: Omit<ActivityLogEntry, "id" | "timestamp" | "user" | "reverted">) => {
    const newEntry: ActivityLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: new Date(),
      user: "admin@baserank.com", // Mock current user
      reverted: false,
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  const revertLog = (id: string) => {
    const log = logs.find((l) => l.id === id);
    if (log && !log.reverted) {
      setLogs((prev) =>
        prev.map((l) => (l.id === id ? { ...l, reverted: true } : l))
      );
      // Add a new log entry for the revert action
      addLog({
        action: "edit",
        entityType: log.entityType,
        entityId: log.entityId,
        entityName: log.entityName,
        field: log.field,
        oldValue: log.newValue,
        newValue: log.oldValue,
      });
      return log;
    }
    return undefined;
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <ActivityLogContext.Provider value={{ logs, addLog, revertLog, clearLogs }}>
      {children}
    </ActivityLogContext.Provider>
  );
}

export function useActivityLog() {
  const context = useContext(ActivityLogContext);
  if (context === undefined) {
    throw new Error("useActivityLog must be used within an ActivityLogProvider");
  }
  return context;
}
