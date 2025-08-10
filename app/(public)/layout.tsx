import React, { PropsWithChildren } from "react";
import Navbar from "@/app/(public)/_components/Navbar";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default PublicLayout;
