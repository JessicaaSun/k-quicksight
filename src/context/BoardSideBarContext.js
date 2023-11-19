"use client";

import { usePathname } from "next/navigation";
import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import { useMedia } from "react-use";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const pathname = usePathname();
  const isHide = pathname.includes("dashboard/", "analysis/");
  const [isSidebarHidden, setIsSidebarHidden] = useState(isHide);

  const isScreenSmall = useMedia('(max-width: 768px)', {
    defaultState: true, 
  });

  useEffect(() => {
    setIsSidebarHidden(isScreenSmall);
  }, [isScreenSmall]);

  const toggleSidebar = () => {
    setIsSidebarHidden((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
