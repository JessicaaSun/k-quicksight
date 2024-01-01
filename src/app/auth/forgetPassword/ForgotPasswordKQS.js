"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useCheckEmailMutation } from "@/store/features/user/userApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdMarkEmailUnread, MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentEmail } from "@/store/features/auth/authSlice";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, isLoading] = useState(false);
  const [checkEmail] = useCheckEmailMutation();
  const [error, setError] = useState("");
  const [verify, showVerify] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const handleConfirmEmail = async () => {
    let body = {
      email,
    };
    if (email === "") {
      setError("We need your email!");
    } else {
      isLoading(true);
      const check_email = await checkEmail({ email: body });
      if (check_email?.data?.message) {
        showVerify(true);
        toast.success("We have send code to you!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleVerify = () => {
    dispatch(setCurrentEmail(email));
    router.push("/auth/verify-forget");
  };

  useEffect(() => {
    if (email) {
      setError("");
    }
  }, [email]);

  return (
    <div
      className={
        "md:py-36 max-sm:py-10 sm:py-10 flex justify-center items-center"
      }
    >
      {verify ? (
        <div
          className={
            "w-1/3 flex flex-col min-h-screen  justify-center items-center p-10 shadow-lg rounded-2xl"
          }
        >
          <MdMarkEmailUnread
            className={"text-5xl text-primary-color dark:text-white"}
          />
          <p
            className={
              "text-3xl text-text-color font-semibold mt-5 mb-7 dark:text-white"
            }
          >
            Check your email
          </p>
          <p
            className={
              "text-lg text-center text-description-color dark:text-white/80"
            }
          >
            We have send verify code to reset your password to{" "}
            <strong>{email}</strong>
          </p>
          <Button
            onClick={handleVerify}
            className={"w-full mt-4 bg-primary-color text-white"}
          >
            Continue <MdNavigateNext />
          </Button>
        </div>
      ) : (
        <div
          id={"card"}
          className={
            "max-sm:pt-40 sm:pt-40 md:pt-10 lg:w-[40%] max-sm:px-8 sm:px-8 px-0 md:w-3/4 max-sm:w-full sm:w-full"
          }
        >
          <h2
            className={"text-center text-primary-color mb-20 dark:text-white"}
          >
            Forget password
          </h2>
          <Input
            className={"dark:text-white"}
            size={"lg"}
            placeholder={"example@gmail.com"}
            variant={"bordered"}
            color={theme === "light" ? "primary" : "warning"}
            type={"email"}
            label={"Enter your email"}
            labelPlacement={"outside"}
            value={email}
            onValueChange={setEmail}
          />
          <p className={"text-red-400 font-semibold"}>{error}</p>
          <Button
            onClick={handleConfirmEmail}
            isLoading={loading}
            variant={"solid"}
            size={"lg"}
            radius={"md"}
            className={
              "w-full my-5 dark:bg-third-color bg-primary-color text-white"
            }
          >
            Next
          </Button>
          <Button
            onClick={() => router.push("/auth/login")}
            color={theme === "light" ? "primary" : "warning"}
            variant={"light"}
            size={"lg"}
            radius={"md"}
            className={"w-full font-semibold"}
          >
            Back to login
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
