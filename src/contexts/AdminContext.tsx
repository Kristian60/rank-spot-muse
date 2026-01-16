import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  login: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false); // Mock: user is logged in as admin
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    if (isAdmin) {
      setIsAdminMode((prev) => !prev);
    }
  };

  const login = () => {
    setIsAdmin(true);
  };

  const logout = () => {
    setIsAdmin(false);
    setIsAdminMode(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isAdminMode, toggleAdminMode, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
