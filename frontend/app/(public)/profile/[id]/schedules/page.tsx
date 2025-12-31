import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

const ProfileSchedulesPage = () => {
  return (
    <Card className="p-6 border-primary/20 mb-6">
      <h3 className="text-xl font-semibold mb-6">Upcoming Bookings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold">
                Gothic Quarter Night Walking Tour
              </div>
              <div className="text-sm text-muted-foreground">
                Dec 15, 2024 at 7:00 PM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" />
                <span>6 guests</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Alex Thompson +5
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <div className="font-semibold">
                Gaudi Architecture Masterclass
              </div>
              <div className="text-sm text-muted-foreground">
                Dec 16, 2024 at 10:00 AM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" />
                <span>4 guests</span>
              </div>
              <div className="text-sm text-muted-foreground">Sarah Kim +3</div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-chart-3/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <div className="font-semibold">
                Authentic Tapas & Wine Experience
              </div>
              <div className="text-sm text-muted-foreground">
                Dec 18, 2024 at 6:30 PM
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" />
                <span>8 guests</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Mike Johnson +7
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSchedulesPage;
