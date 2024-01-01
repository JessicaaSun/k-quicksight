"use client";
import { useSidebar } from "@/context/BoardSideBarContext";
import KQSEditor from "@/lib/editor/Editor";
import { useGetDashboardDetailByUuidQuery } from "@/store/features/dashboard/dashboardApiSlice";
import React, { useEffect } from "react";

const DashboardDetailKQS = ({ uuid }) => {
  const { data: dashboardDetail, isLoading: isDashboardLoading } =
    useGetDashboardDetailByUuidQuery({
      uuid: uuid,
    });
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      const message = "Make sure to save your dashboard before leaving or you will lose the changes.";
      event.returnValue = message; // Standard
      return message;
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  const { isSidebarHidden } = useSidebar();
  return (
    <div>
      <KQSEditor
        dashboardData={dashboardDetail}
        isSidebarHidden={isSidebarHidden}
      />
    </div>
  );
};

export default DashboardDetailKQS;
