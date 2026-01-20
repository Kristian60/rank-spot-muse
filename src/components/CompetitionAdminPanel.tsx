import { Flag, RefreshCw, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";

interface CompetitionAdminPanelProps {
  competitionId: string;
  competitionName: string;
}

export function CompetitionAdminPanel({ competitionId, competitionName }: CompetitionAdminPanelProps) {
  const { isAdmin, isAdminMode } = useAdmin();

  if (!isAdmin || !isAdminMode) {
    return null;
  }

  const handleAssignNations = () => {
    // Placeholder action
    toast.success("Nations assigned to athletes without a nationality", {
      description: "12 athletes updated with the competition's default nation.",
    });
  };

  const handleRecalculateRankings = () => {
    // Placeholder action
    toast.success("Rankings recalculated", {
      description: "All division rankings have been updated based on current results.",
    });
  };

  const handleClearDNFAthletes = () => {
    // Placeholder action
    toast.success("DNF athletes removed", {
      description: "3 athletes with DNF status have been removed from the competition.",
    });
  };

  return (
    <Card className="border-primary/20 bg-primary/5 mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Admin Actions</CardTitle>
        </div>
        <CardDescription className="text-sm">
          Quick actions for managing {competitionName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAssignNations}
            className="gap-2 shrink-0"
          >
            <Flag className="h-4 w-4" />
            Assign nations
          </Button>
          <div className="pt-0.5">
            <p className="text-sm text-muted-foreground">Sets the competition's host nation for all athletes currently without a nationality assigned.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 pb-6 border-b border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRecalculateRankings}
            className="gap-2 shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
            Recalculate
          </Button>
          <div className="pt-0.5">
            <p className="text-sm text-muted-foreground">Updates all division rankings based on current scores, times, and tiebreaker rules.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearDNFAthletes}
            className="gap-2 shrink-0 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
          >
            <Trash2 className="h-4 w-4" />
            Remove DNF
          </Button>
          <div className="pt-0.5">
            <p className="text-sm text-muted-foreground">Permanently removes all athletes marked as Did Not Finish from this competition's results.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
