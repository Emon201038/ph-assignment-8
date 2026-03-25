import React from "react";

const layout = ({
  children,
  personalInfo,
  emergencyContact,
  security,
}: {
  children: React.ReactNode;
  personalInfo: React.ReactNode;
  emergencyContact: React.ReactNode;
  security: React.ReactNode;
}) => {
  return (
    <main className="flex-1 lg:ml-64 pb-12 px-8 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <header className="mb-16">
        <h1 className="text-6xl font-black tracking-tighter text-on-surface mb-2 font-headline">
          Account Settings
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Manage your personal information, security preferences, and how you
          experience your digital travel journal.
        </p>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-8 flex flex-col gap-12">
          {/* Personal Information Section */}
          {personalInfo}
          {emergencyContact}
          {security}
        </div>
        {children}
      </div>
    </main>
  );
};

export default layout;
