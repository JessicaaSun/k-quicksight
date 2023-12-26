import React from "react";
import { Community_navbar } from "@/components/navbar/Navbar";
import TermOfService from "@/components/terms/TermOfService";

const Confirmation = () => {
  return (
    <main className="pb-16 bg-bg-color">
      <Community_navbar />
      <TermOfService />
    </main>
  );
};

export default Confirmation;
