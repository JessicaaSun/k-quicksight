import React from "react";
import SharedDataKQS from "./SharedDataKQS";

export const metadata = {
  title: "Shared Dataset",
  description:
    "Access datasets shared with you and files you've shared with others on K-QuickSight.",
  keywords: [
    "Shared Files",
    "Data Sharing",
    "Collaboration",
    "Data Collaboration",
  ],
};

const page = () => {
  return <SharedDataKQS />;
};

export default page;
