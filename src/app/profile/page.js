import React from 'react'
import ProfileKQS from './ProfileKQS'

export const metadata = {
  title: "Profile",
  description: "Manage your K-QuickSight user profile. Update your account information and preferences.",
  keywords: ["User Profile", "Profile", "Profile Management", "K-QuickSight Profile"],
};


const page = () => {
  return (
   <ProfileKQS/>
  )
}

export default page
