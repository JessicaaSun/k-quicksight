"use client"
import { useSidebar } from "@/context/BoardSideBarContext";
import KQSEditor from "@/lib/editor/Editor";
import React from "react";

const Page = ({ params }) => {
  const { isSidebarHidden } = useSidebar();
  console.log("is hidden", isSidebarHidden)
  return (
    <div>
      <KQSEditor isSidebarHidden={isSidebarHidden} />
    </div>
  );
};

export default Page;
