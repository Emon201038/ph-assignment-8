import React from "react";

const SingleDestinationLayout = ({
  children,
  relatedTours,
  heroSection,
  sidebar,
}: {
  children: React.ReactNode;
  relatedTours: React.ReactNode;
  heroSection: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <main className="flex-1">
      {heroSection}
      <div className="max-w-300 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {children}
        {sidebar}
        {relatedTours}
      </div>
    </main>
  );
};

export default SingleDestinationLayout;
