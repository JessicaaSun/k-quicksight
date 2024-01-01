import React from "react";
import AnalysisKQS from "./AnalysisKQS";

export const metadata = {
  title: "Analysis",
  description: "View and create data analysis projects on K-QuickSight. Uncover insights from your data.",
  keywords: ["Analysis", "Data Analysis", "Data Insights", "Analytics Projects"],
};

const page = () => {
  return <AnalysisKQS />;
};

export default page;
