"use client";

import { Button, Input, Link } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/auth/authSlice";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import GoogleSignInBtn from "@/components/buttons/GoogleSignInBtn";
import { toast } from 'react-toastify';

export default function LoginQuick() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isPasswordDisabled, setIsDisabled] = useState(false);
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

  const handleSubmit = async () => {
    try {
      // .unwrap() is a utility function that will return either the fulfilled value or throw the rejected value as an error.
      const { data } = await login({ email, password }).unwrap();
      console.log("data: ",data)
      setIsDisabled(true)
      dispatch(setCredentials(data));
      toast.success("Login Success.")
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      if (!error.response) {
        toast.error("Bad credential please try again.")
      } else if (error.response.status === 400) {
        toast.warn("Missing email or password");
      } else if (error.response.status === 403) {
        toast.error("Forbidden - You don't have permission to access this resource");
      }
    }
  };

  return (
    <div className={'w-1/3 rounded-xl shadow-md'}>
      <div className="w-full rounded-2xl bg-white flex flex-col gap-4 p-7">
        <h2 className="text-primary-color mb-2">
          Login
        </h2>
        <Input
          type="email"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : ""}
          errorMessage={isInvalid && "Please enter a valid email"}
          onValueChange={setEmail}
          isRequired
          placeholder={'Email'}
          required
          variant="bordered"
          classNames={styleInput}
        />
        <Input
          isDisabled={isPasswordDisabled}
          variant="bordered"
          required
          placeholder={'Password'}
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
        <GoogleSignInBtn></GoogleSignInBtn>
        <span className="pt-[20px] text-text-color">
              Does not has any account?{" "}
              <Link
                href={"/auth/signup"}
                className="text-primary-color font-semibold"
              >
                SignUp
              </Link>
        </span>
      </div>
    </div>
  );
}