import React from "react";
import DatasetKQS from "./DatasetKQS";

export const metadata = {
  title: "Dataset",
  description:
    "Explore and import datasets on K-QuickSight. Power your data analysis with diverse datasets.",
  keywords: ["Datasets", "Data Import", "Data Analysis", "Data Exploration"],
};

const page = () => {
  return <DatasetKQS />;
};

export default page;
