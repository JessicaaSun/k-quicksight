import React from 'react'
import DashboardKQS from './DashboardKQS'

export const metadata = {
  title: "Dashboard",
  description: "Discover and create data visualizations on K-QuickSight's dashboard. Visualize data for better understanding.",
  keywords: ["Visualization", "Data Visualization", "Data Charts", "Visual Insights"],
};

const page = () => {
  return (
   <DashboardKQS/>
  )
}

export default page
