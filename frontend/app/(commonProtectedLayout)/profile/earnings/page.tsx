import { Card } from "@/components/ui/card";
import React from "react";

const ProfileEarningsPage = () => {
  return (
    <Card className="p-6 border-primary/20 mb-6">
      <h3 className="text-xl font-semibold mb-6">Earnings Overview</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
          <div className="text-sm text-muted-foreground mb-2">This Month</div>
          <div className="text-3xl font-bold text-primary">€3,450</div>
          <div className="text-sm text-muted-foreground mt-2">
            +12% from last month
          </div>
        </div>
        <div className="p-6 bg-chart-2/5 rounded-lg border border-chart-2/20">
          <div className="text-sm text-muted-foreground mb-2">
            Total Earnings
          </div>
          <div className="text-3xl font-bold text-chart-2">€28,900</div>
          <div className="text-sm text-muted-foreground mt-2">All time</div>
        </div>
        <div className="p-6 bg-chart-3/5 rounded-lg border border-chart-3/20">
          <div className="text-sm text-muted-foreground mb-2">Pending</div>
          <div className="text-3xl font-bold text-chart-3">€850</div>
          <div className="text-sm text-muted-foreground mt-2">
            To be paid out
          </div>
        </div>
      </div>

      <h4 className="font-semibold mb-4">Recent Transactions</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <div className="font-medium">Gothic Quarter Night Walking Tour</div>
            <div className="text-sm text-muted-foreground">Dec 10, 2024</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-chart-2">+€120</div>
            <div className="text-xs text-muted-foreground">6 guests</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <div className="font-medium">Gaudi Architecture Masterclass</div>
            <div className="text-sm text-muted-foreground">Dec 8, 2024</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-chart-2">+€200</div>
            <div className="text-xs text-muted-foreground">4 guests</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <div className="font-medium">Tapas & Wine Experience</div>
            <div className="text-sm text-muted-foreground">Dec 5, 2024</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-chart-2">+€240</div>
            <div className="text-xs text-muted-foreground">8 guests</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileEarningsPage;
