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

    return validateEmail(email) ? false : true;
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
      <a href="/" className="fixed top-5 right-10">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 4.3125C12.6958 4.3125 4.3125 12.6958 4.3125 23C4.3125 33.3042 12.6958 41.6875 23 41.6875C33.3042 41.6875 41.6875 33.3042 41.6875 23C41.6875 12.6958 33.3042 4.3125 23 4.3125ZM29.7661 27.7339C29.9052 27.866 30.0165 28.0247 30.0933 28.2005C30.1701 28.3763 30.2109 28.5658 30.2134 28.7576C30.2159 28.9495 30.1799 29.1399 30.1076 29.3176C30.0353 29.4954 29.9282 29.6568 29.7925 29.7925C29.6568 29.9282 29.4954 30.0353 29.3176 30.1076C29.1399 30.1799 28.9495 30.2159 28.7576 30.2134C28.5658 30.2109 28.3763 30.1701 28.2005 30.0933C28.0247 30.0165 27.866 29.9052 27.7339 29.7661L23 25.0332L18.2661 29.7661C17.9944 30.0243 17.6325 30.1662 17.2576 30.1614C16.8828 30.1566 16.5246 30.0055 16.2596 29.7404C15.9945 29.4754 15.8434 29.1172 15.8386 28.7424C15.8338 28.3675 15.9757 28.0056 16.2339 27.7339L20.9668 23L16.2339 18.2661C15.9757 17.9944 15.8338 17.6325 15.8386 17.2576C15.8434 16.8828 15.9945 16.5246 16.2596 16.2596C16.5246 15.9945 16.8828 15.8434 17.2576 15.8386C17.6325 15.8338 17.9944 15.9757 18.2661 16.2339L23 20.9668L27.7339 16.2339C28.0056 15.9757 28.3675 15.8338 28.7424 15.8386C29.1172 15.8434 29.4754 15.9945 29.7404 16.2596C30.0055 16.5246 30.1566 16.8828 30.1614 17.2576C30.1662 17.6325 30.0243 17.9944 29.7661 18.2661L25.0332 23L29.7661 27.7339Z"
            fill="url(#paint0_linear_92_5055)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_92_5055"
              x1="23"
              y1="4.3125"
              x2="23"
              y2="41.6875"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA561" />
              <stop offset="1" stopColor="#FD6D00" />
            </linearGradient>
          </defs>
        </svg>
      </a>
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
          <p>Continue with google</p>
        </Button>
        <div className="flex justify-center items-center gap-5">
          <div className="w-full h-0.5 bg-text-color rounded-md"></div>
          <div>or</div>
          <div className="w-full h-0.5 bg-text-color rounded-md"></div>
        </div>
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

        <span className="text-text-color">
          Does not have an account?{" "}
          <Link
            href={"/pages/signup"}
            className="text-primary-color font-semibold"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}
