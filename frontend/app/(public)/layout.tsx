import { Footer } from "@/components/module/shared/footer";
import { Navbar } from "@/components/module/shared/navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
