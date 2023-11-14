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
  const { data: session, status, loading } = useSession();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    signIn("google");

    if (session) {
      let email =
        `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}` + session.user.email;
      let password = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}@123`;

      if (!(await isEmailExists(email))) {
        // register
        const username = "Unknown";
        await handleRegisterWithGoogle(username, email, password);
      }
      alert(await isEmailExists(email));

      await handleLogin(email, password);
    }
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
  const handleRegisterWithGoogle = async (username, email, password) => {
    alert("work here");
    try {
      var raw = JSON.stringify({
        username: username,
        email: email,
        password: password,
      });

      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "accounts/register-google/",
        {
          method: "POST",
          body: raw,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.json())
      if (response.status === 201) {
        const res = await response.json();
        toast.success("Register with Google successfully.");
      } else {
        // Handle non-successful responses (e.g., display an error message)
        const errorMessage = await response.text();
        throw new Error(`Failed to register with Google: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error registering with Google:", error.message);
      // Handle the error (e.g., display an error message to the user)
      toast.error("Failed to register with Google. Please try again.");
    }
  };

  const isEmailExists = async (email) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `users/email/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();

      if (response.status === 200) {
        return true;
      } else {
        // Handle non-successful responses (e.g., log an error message)
        const errorMessage = await response.text();
        console.error(`Failed to check email existence: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error checking email existence:", error.message);
      // Handle the error (e.g., display an error message to the user)
    }

    return false; // Default to false if an error occurs
  };

  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  return (
    <div>
      <Button
        type="submit"
        onClick={handleLoginWithGoogle}
        // onClick={() => popupCenter("/auth/login", "Sign In with you google account")}
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
    </div>
  );
};

export default GoogleSignInBtn;
