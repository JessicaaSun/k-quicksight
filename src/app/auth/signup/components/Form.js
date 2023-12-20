"use client";
import GoogleSignInBtn from "@/components/buttons/GoogleSignInBtn";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { Button, Checkbox } from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useRegisterMutation } from "@/store/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCurrentEmail } from "@/store/features/auth/authSlice";
import Image from "next/image";

export const fieldNormal =
  "block w-full px-4 py-[8px] mt-2 border-gray-200 border-1  bg-white rounded-xl";

const SignUpForm = () => {
  const [showPassword, setPassword] = useState(false);
  const [show_con_Password, set_con_Password] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const router = useRouter();
  const [checkBox, setCheckbox] = useState(false);
  const [checkBoxError, setCheckBokError] = useState(false);
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const handleCheckbox = () => {
    setCheckbox((e) => !e);
  };

  const togglePasswordVisibility = () => {
    setPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    set_con_Password((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleRegister = async (data) => {
    if (data.is_confirmed === false) {
      setCheckBokError(true);
    } else {
      setCheckBokError(false);
      const register_data = await register({ data: data });
      dispatch(setCurrentEmail(register_data?.data?.email));
      router.push("/auth/verify");
    }
    setIsLoading(false);
  };

  return (
    <div className="md:w-[60%] lg:w-[45%] max-sm:w-full sm:w-full md:pe-20 lg:pe-30 max-sm:px-10 sm:px-10 flex h-full flex-col">
      <p className="text-description-color text-lg font-medium">
        Welcome to K-QuickSight!
      </p>
      <h2 className={"mb-8 pt-2 text-primary-color"}>Sign Up</h2>
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
            errors.email = "Email is required";
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
            errors.confirm_password = "Confirm is required";
          } else if (values.password !== values.confirm_password) {
            errors.confirm_password = "Password does not matched";
          }
          if (!values.confirm_privacy === false) {
            errors.confirm_privacy = "You should check the privacy terms.";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            username: values.username,
            email: values.email,
            password: values.password,
            is_confirmed: checkBox,
          };
          setIsLoading(true);
          handleRegister(data);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>

              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className={fieldNormal}
              />
              <ErrorMessage
                name="username"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                className={fieldNormal}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={fieldNormal}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-700 hover:text-gray-400 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeFilledIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeSlashFilledIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  type={show_con_Password ? "text" : "password"}
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm password"
                  className={fieldNormal}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-700 hover:text-gray-400 focus:outline-none"
                >
                  {show_con_Password ? (
                    <EyeFilledIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeSlashFilledIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              <ErrorMessage
                name="confirm_password"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-4">
              <Checkbox onClick={handleCheckbox} radius="md"></Checkbox>
              <span>
                Check and read{" "}
                <Link
                  href={"/auth/confirmation"}
                  target={"_blank"}
                  className={
                    "text-secondary-color font-semibold hover:underline"
                  }
                >
                  Term and Privacy
                </Link>
                <p className={"text-red-500"}>
                  {checkBoxError ? "You should accept the term" : ""}
                </p>
              </span>
            </div>{" "}
            <div className="mt-7 flex flex-col items-center w-full justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-auto bg-primary-color justify-center flex primaryButton px-24 cursor-pointer py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-primary rounded-3xl hover:bg-[#033A87] focus:outline-none "
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <p className="mr-2">Signing Up</p>
                    <Image
                      width={24}
                      height={24}
                      className="w-6 h-6 animate-spin"
                      src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                      alt="Loading icon"
                    ></Image>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center items-center flex-col">
        <p className="my-3 text-description-color">OR</p>
        <div>
          <GoogleSignInBtn></GoogleSignInBtn>
        </div>
        <p className="pt-[20px] max-sm:text-center sm:text-center md:text-start text-text-color">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-secondary-color font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
