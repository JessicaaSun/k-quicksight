"use client";

import { Button, Input, Link } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/auth/authSlice";
import Image from "next/image";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";

export default function LoginQuick() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return !validateEmail(email);
  }, [email]);

  const styleInput = {
    inputWrapper: ["border-2", "border-primary-color", "h-[46px]"],
  };

  const handleSubmitGoogle = () => {
    alert("Hehe not google yet");
  };

  const handleSubmit = async () => {
    try {
      // .unwrap() is a utility function that will return either the fulfilled value or throw the rejected value as an error.
      const { data } = await login({ email, password }).unwrap();
      dispatch(setCredentials(data));
      router.push("/");
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
    <div className="flex flex-col items-center justify-center h-screen gap-5 p-3">
      <div className="lg:w-1/3 md:w-1/2 shadow-lg w-full rounded-2xl bg-white flex flex-col gap-[20px] border-2 border-primary-color py-10 px-10">
        <h2 className="font-semibold text-text-color text-2xl">
          Welcome back!
        </h2>
        <Input
          type="email"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : ""}
          errorMessage={isInvalid && "Please enter a valid email"}
          onValueChange={setEmail}
          label="Email"
          isRequired
          required
          variant="bordered"
          classNames={styleInput}
        />
        <Input
          label="Password"
          variant="bordered"
          required
          classNames={styleInput}
          value={password}
          onValueChange={setPassword}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />

        {!isLoading ? (
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary-color text-white h-[46px] font-semibold"
          >
            Login
          </Button>
        ) : (
          <Button
            isLoading
            type="submit"
            onClick={handleSubmit}
            className="bg-primary-color text-white h-[54px] font-semibold"
          >
            Login
          </Button>
        )}
        <div className="flex justify-center items-center gap-5">
          <div className="w-full h-0.5 bg-text-color rounded-md"></div>
          <div>or</div>
          <div className="w-full h-0.5 bg-text-color rounded-md"></div>
        </div>
        <Button
          type="submit"
          onClick={handleSubmitGoogle}
          className="bg-white text-text-color h-[46px] border-1 border-primary-color font-semibold flex gap-5"
        >
          <Image
            src="/assets/images/google_logo.png"
            alt="google"
            width={20}
            height={20}
          />
          <p className="text-text-color">Continue with google</p>
        </Button>

        <span className="pt-[20px] text-text-color">
          Does not have an account?{" "}
          <Link
            href={"/auth/signup"}
            className="text-primary-color font-semibold"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}
