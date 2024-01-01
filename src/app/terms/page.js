import TermOfService from '@/components/terms/TermOfService'
import React from 'react'

export const metadata = {
  title: "Terms of Service",
  description: "Review the terms of service for K-QuickSight. Understand our policies and guidelines.",
  keywords: ["Terms of Service", "User Agreement", "Website Policies", "Legal"],
};

const page = () => {
  return (
    <main className='xl:pt-20  md:pt-28 max-sm:pt-32 sm:pt-32'>
      <TermOfService/>
    </main>
  )
}

export default page
