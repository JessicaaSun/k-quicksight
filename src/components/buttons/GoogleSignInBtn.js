"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleSignInBtn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    signIn("google");
  };

  const handleLogin = async (email, password) => {
    try {
      const { data } = await login({ email, password }).unwrap();
      console.log("data: ", data);
      dispatch(setCredentials(data));
      setTimeout(async () => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (!error.response) {
        alert("No Server Response");
        console.log(error);
      } else if (error.response.status === 400) {
        alert("Missing email or password");
      } else if (error.response.status === 403) {
        alert("Forbidden - You don't have permission to access this resource");
      }
    }
  };

  return (
      <Button
        type="submit"
        onClick={handleLoginWithGoogle}
        className="bg-white text-text-color h-[46px] border-1 border-primary-color font-semibold flex gap-5"
      >
        <Image
          src="/assets/images/google_logo.png"
          alt="google"
          width={20}
          height={20}
        />
        <p className="font-semibold text-text-color">Continue with google</p>
      </Button>
  );
};

export default GoogleSignInBtn;
