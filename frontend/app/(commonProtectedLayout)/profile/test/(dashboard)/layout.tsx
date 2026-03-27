import React from "react";

const layout = ({
  children,
  personalInfo,
  stats,
  history,
}: {
  children: React.ReactNode;
  personalInfo: React.ReactNode;
  stats: React.ReactNode;
  history: React.ReactNode;
}) => {
  return (
    <main className="lg:ml-64 pb-12 px-4 lg:px-8 min-h-screen bg-surface w-full lg:w-[calc(100%-256px)]">
      {/* Personal Info Section */}
      {personalInfo}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Stats Row */}
          {stats}
          {/* Recent Activity / Travel Milestones Component */}
          {history}
        </div>
        {children}
      </div>
    </main>
  );
};

export default layout;
