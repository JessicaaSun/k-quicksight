import React from 'react'
import VerifyKQS from './VerifyKQS'

export const metadata = {
  title: "Verification",
  description: "Verify your email address on K-QuickSight. Enter the code sent to your email after signing up to complete the verification process.",
  keywords: ["Authentication", "Email Verification", "Verification Code", "User Account"],
};


const page = () => {
  return (
   <VerifyKQS/>
  )
}

export default page
