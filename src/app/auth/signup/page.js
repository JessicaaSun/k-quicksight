"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import google from "@assets/images/google_logo.png";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import {Button, Checkbox} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [showPassword, setPassword] = useState(false);
  const [show_con_Password, set_con_Password] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const router = useRouter();
  const [checkBox, setCheckbox] = useState(false)

  const handleCheckbox = () => {
    setCheckbox(e => !e)
  }

  const inputStyle =
    "w-full px-5 py-2 rounded-xl border-2 border-primary-color";
  const togglePasswordVisibility = () => {
    setPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    set_con_Password((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  return (
    <div
      className={
        "min-h-screen bg-background-color lg:p-auto md:p-auto px-3 flex justify-center items-center"
      }
    >
      <button onClick={() => router.push("/")} className="fixed top-5 right-10">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 4.3125C12.6958 4.3125 4.3125 12.6958 4.3125 23C4.3125 33.3042 12.6958 41.6875 23 41.6875C33.3042 41.6875 41.6875 33.3042 41.6875 23C41.6875 12.6958 33.3042 4.3125 23 4.3125ZM29.7661 27.7339C29.9052 27.866 30.0165 28.0247 30.0933 28.2005C30.1701 28.3763 30.2109 28.5658 30.2134 28.7576C30.2159 28.9495 30.1799 29.1399 30.1076 29.3176C30.0353 29.4954 29.9282 29.6568 29.7925 29.7925C29.6568 29.9282 29.4954 30.0353 29.3176 30.1076C29.1399 30.1799 28.9495 30.2159 28.7576 30.2134C28.5658 30.2109 28.3763 30.1701 28.2005 30.0933C28.0247 30.0165 27.866 29.9052 27.7339 29.7661L23 25.0332L18.2661 29.7661C17.9944 30.0243 17.6325 30.1662 17.2576 30.1614C16.8828 30.1566 16.5246 30.0055 16.2596 29.7404C15.9945 29.4754 15.8434 29.1172 15.8386 28.7424C15.8338 28.3675 15.9757 28.0056 16.2339 27.7339L20.9668 23L16.2339 18.2661C15.9757 17.9944 15.8338 17.6325 15.8386 17.2576C15.8434 16.8828 15.9945 16.5246 16.2596 16.2596C16.5246 15.9945 16.8828 15.8434 17.2576 15.8386C17.6325 15.8338 17.9944 15.9757 18.2661 16.2339L23 20.9668L27.7339 16.2339C28.0056 15.9757 28.3675 15.8338 28.7424 15.8386C29.1172 15.8434 29.4754 15.9945 29.7404 16.2596C30.0055 16.5246 30.1566 16.8828 30.1614 17.2576C30.1662 17.6325 30.0243 17.9944 29.7661 18.2661L25.0332 23L29.7661 27.7339Z"
            fill="#0346A5"
          />
        </svg>
      </button>
      <div
        className={
          "lg:w-1/3 md:w-2/3 w-full border-2 bg-white shadow-lg border-primary-color rounded-3xl p-10"
        }
      >
        <h2 className={"mb-10 text-text-color"}>Hello, dear!</h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.username) {
              errors.username = "We need your name!";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.length < 8) {
              errors.password = "Password must be at least 8 characters long";
            } else if (!/[a-zA-Z]/.test(values)) {
              errors.password = "Password must contain at least one letter";
            }
            if (!values.confirm_password) {
              errors.confirm_password = "confirm has been required";
            } else if (values.password !== values.confirm_password) {
              errors.confirm_password = "password not matched";
            }
            if (!values.confirm_privacy === false) {
              errors.confirm_privacy = 'You should check the privacy terms.'
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              username: values.username,
              email: values.email,
              password: values.password,
              isConfirm: checkBox
            };
            setIsLoading(true);
            axios
              .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}accounts/register/`,
                data
              )
              .then(function (response) {
                router.push(`/verify/${response.data.data.email}`);
              })
              .catch(function (error) {
                setErrorMessage(error?.response?.data?.errors);
                setIsLoading(false);
              });

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={"flex bg-white flex-col gap-[20px] w-full"}>
              <div>
                <Field
                  className={inputStyle}
                  type="text"
                  name={"username"}
                  placeholder="Username"
                />
                <p className="text-red-600 font-normal">
                  {errorMessage?.username}
                </p>
                <ErrorMessage
                  className={"text-red-500"}
                  name={"username"}
                  component={"div"}
                />
              </div>
              <div>
                <Field
                  className={inputStyle}
                  type="email"
                  name="email"
                  placeholder={"Email"}
                />
                <p className="text-red-600 font-normal">
                  {errorMessage?.email}
                </p>
                <ErrorMessage
                  className={"text-red-500"}
                  name="email"
                  component="div"
                />
              </div>
              <div>
                <div className={"relative"}>
                  <Field
                    className={inputStyle}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={"Password"}
                  />
                  <button
                    className={
                      "absolute translate-x-[80%] opacity-80 translate-y-1/3 right-10"
                    }
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  className={"text-red-500"}
                  name="password"
                  component="div"
                />
              </div>
              <div className={"relative"}>
                <Field
                  className={inputStyle}
                  type={show_con_Password ? "text" : "password"}
                  name="confirm_password"
                  placeholder={"confirm -password"}
                />
                <button
                  className={
                    "absolute translate-x-[80%] opacity-80 translate-y-1/3 right-10"
                  }
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {show_con_Password ? (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
                <ErrorMessage
                  className={"text-red-500"}
                  name="confirm_password"
                  component="div"
                />
              </div>
              <div>
                <Checkbox onClick={handleCheckbox} radius="md"></Checkbox>
                <span>Check <Link href={'/'} target={'_blank'} className={'text-primary-color font-semibold hover:underline'}> and read Term and Privacy</Link> </span>
              </div>
              {!isLoading ? (
                <Button
                  className={
                    "bg-primary-color py-3 rounded-xl font-semibold text-background"
                  }
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  className={
                    "bg-primary-color py-3 rounded-xl font-semibold text-lg text-background"
                  }
                  isLoading={true}
                >
                  Signing up ...
                </Button>
              )}
              <div className={"flex gap-5 justify-center items-center"}>
                <div className={"w-full h-0.5 bg-description-color"}></div>
                <div className={"font-semibold text-description-color"}>OR</div>
                <div className={"w-full h-0.5 bg-description-color"}></div>
              </div>
              <Button
                type="submit"
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
            </Form>
          )}
        </Formik>
        <p className="mt-[20px] text-text-color">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-primary-color font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
