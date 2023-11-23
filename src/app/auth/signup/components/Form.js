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
import {useRegisterMutation} from "@/store/features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {setCurrentEmail} from "@/store/features/auth/authSlice";

const SignUpForm = () => {
  const [showPassword, setPassword] = useState(false);
  const [show_con_Password, set_con_Password] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const router = useRouter();
  const [checkBox, setCheckbox] = useState(false);
  const [checkBoxError, setCheckBokError] = useState(false)
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const handleCheckbox = () => {
    setCheckbox((e) => !e);
  };

  const inputStyle =
    "w-full px-5 py-2 rounded-xl border-2 border-primary-color";
  const togglePasswordVisibility = () => {
    setPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    set_con_Password((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleRegister = async (data) => {
    if (data.is_confirmed === false) {
      setCheckBokError(true)
    } else {
      setCheckBokError(false)
      const register_data = await register({data:data})
      dispatch(setCurrentEmail(register_data?.data?.email))
      router.push("/auth/verify")
    }
    setIsLoading(false)
  }

  return (
    <div
      className={
        "lg:w-1/3 md:w-2/3 w-full bg-white shadow-lg rounded-3xl p-10"
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
          handleRegister(data)
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
              <p className="text-red-600 font-normal">{errorMessage?.email}</p>
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
              <span>
                Check{" "}
                <Link
                  href={"/auth/confirmation"}
                  target={"_blank"}
                  className={"text-primary-color font-semibold hover:underline"}
                >
                  and read Term and Privacy
                </Link>
                <p className={'text-red-500'}>{checkBoxError ? 'You should accept the term' : ''}</p>
              </span>
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
            <GoogleSignInBtn></GoogleSignInBtn>
          </Form>
        )}
      </Formik>
      <p className="mt-[20px] text-text-color">
        Already have an account?{" "}
        <Link href={"/auth/login"} className="text-primary-color font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
