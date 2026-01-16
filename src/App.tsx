import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import { ActivityLogProvider } from "./contexts/ActivityLogContext";
import Index from "./pages/Index";
import AthleteDetail from "./pages/AthleteDetail";
import CompetitionDetail from "./pages/CompetitionDetail";
import Rankings from "./pages/Rankings";
import SponsorDetail from "./pages/SponsorDetail";
import GymDetail from "./pages/GymDetail";
import CoachDetail from "./pages/CoachDetail";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
    <ActivityLogProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/athlete/:id" element={<AthleteDetail />} />
          <Route path="/competition/:id" element={<CompetitionDetail />} />
          <Route path="/sponsor/:id" element={<SponsorDetail />} />
          <Route path="/gym/:id" element={<GymDetail />} />
          <Route path="/coach/:id" element={<CoachDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ActivityLogProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
