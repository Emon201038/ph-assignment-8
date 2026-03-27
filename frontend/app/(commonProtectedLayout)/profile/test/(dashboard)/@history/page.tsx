import { Heart, MessageSquare, Ticket, Trophy } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <div className="grow rounded-2xl mx-2 mb-2 relative overflow-hidden">
      {/* Recent Activity / Travel Milestones Component */}
      <div className="bg-surface-container-low rounded-3xl p-8 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-bold text-lg">Travel Milestones</h3>
            <p className="text-sm text-on-surface-variant">
              Your latest wanderlust achievements
            </p>
          </div>
          {/* <button className="text-xs font-bold text-primary hover:underline">
            View All History
          </button> */}
        </div>

        <div className="space-y-6">
          {/* Milestone Item 1 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <Ticket size={18} />
            </div>
            <div className="grow">
              <div className="flex justify-between items-start gap-3">
                <h4 className="font-bold text-sm text-on-surface">
                  Booked a tour to Kyoto
                </h4>
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                  Today, 2:15 PM
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Confirmed 'Zen Gardens & Shrines' group expedition for Oct 2024.
              </p>
            </div>
          </div>

          {/* Milestone Item 2 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
              <Heart size={18} className="fill-current" />
            </div>
            <div className="grow">
              <div className="flex justify-between items-start gap-3">
                <h4 className="font-bold text-sm text-on-surface">
                  Added Amalfi Coast to Favorites
                </h4>
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                  Yesterday
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Saved for your Summer 2025 Mediterranean dream board.
              </p>
            </div>
          </div>

          {/* Milestone Item 3 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary-fixed shrink-0">
              <Trophy size={18} />
            </div>
            <div className="grow">
              <div className="flex justify-between items-start gap-3">
                <h4 className="font-bold text-sm text-on-surface">
                  Earned the 'Mountain King' badge
                </h4>
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                  3 days ago
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Awarded for completing 5 high-altitude alpine expeditions.
              </p>
            </div>
          </div>

          {/* Milestone Item 4 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <MessageSquare size={18} />
            </div>
            <div className="grow">
              <div className="flex justify-between items-start gap-3">
                <h4 className="font-bold text-sm text-on-surface">
                  Published 'Patagonia Peak' Review
                </h4>
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                  Aug 28, 2024
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Your detailed guide reached 1.2k other Wayfarers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
