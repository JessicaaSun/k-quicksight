"use client";

import { usePathname } from "next/navigation";
import { createContext } from "react";
import { useContext, useState, useEffect } from "react";
import { useMedia } from "react-use";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const pathname = usePathname();
  const shouldHideSidebar = pathname.includes("dashboard/**") || pathname.includes("analysis/**")|| pathname.includes("editor");
  const isScreenSmall = useMedia('(max-width: 768px)', {
    defaultState: true,
  });

  const [isSidebarHidden, setIsSidebarHidden] = useState(() => {
    return shouldHideSidebar || isScreenSmall;
  });

  useEffect(() => {
    if (!shouldHideSidebar) {
      setIsSidebarHidden(isScreenSmall);
    }
  }, [shouldHideSidebar, isScreenSmall]);

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
