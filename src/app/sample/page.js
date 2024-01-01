import React from "react";
import SampleKQS from "./SampleKQS";

export const metadata = {
  title: "Sample",
  description:
    "Explore sample datasets, Jupyter notebooks, analyses, and dashboards on K-QuickSight.",
  keywords: ["Samples", "Sample Data", "Jupyter Notebooks", "Data Dashboards"],
};

const page = () => {
  return <SampleKQS />;
};

export default page;
