"use client";

import {
  selectCurrentAccessToken,
  selectCurrentUser,
  setCredentials,
  setCurrentUser,
} from "@/store/features/auth/authSlice";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Outlet({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const paths = pathname.split("/").filter((el) => el !== "");
  const router = useRouter();

  useEffect(() => {
    const handleSessionError = (error) => {
      console.error("Error processing session:", error);
      // You might want to redirect the user to a login page or handle the error differently
    };

    if (session) {
      try {
        const { user } = session;
        if (user) {
          const { name, email, image } = user;
          // Assuming 'image' is the URL you want to use
          dispatch(setCurrentUser({ name, email, image }));
  
          // You can also update the Redux store with the session information if needed
          // const { accessToken, refreshToken } = session;
          // dispatch(setCredentials({ accessToken, refreshToken }));
  
          // Handle other cases as needed
        } else {
          handleSessionError("Invalid user data in session");
        }
      } catch (e) {
        handleSessionError(e);
      }
    } else {
      handleSessionError("No session data available");
    }
  }, [dispatch, session]);

  return children;
}
