"use client";
import { Formik, Form, Field, ErrorMessage, setIn } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import GoogleSignInBtn from "@/components/buttons/GoogleSignInBtn";
import Image from "next/image";
import { fieldNormal } from "../../signup/components/Form";
// least 6 characters long, contains at least one uppercase letter, one lowercase letter, and one number
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

// create a validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
    ),
});

export default function FormLogin() {
  const router = useRouter();
  const [invalidMsg, setInvalidMsg] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // eye toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // forgot password
  const toggleForgotPasswordVisibility = () => {
    setShowForgotPassword((prevState) => !prevState);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      const { data } = await login({ email, password }).unwrap();
      dispatch(setCredentials(data));
      toast.success('🦄 Login Success!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      if (!error.response) {
        toast.error("Bad credential please try again.");
      } else if (error.response.status === 400) {
        toast.warn("Missing email or password");
      } else if (error.response.status === 403) {
        toast.error(
          "Forbidden - You don't have permission to access this resource"
        );
      }
    }
  };
  const initialValuesMail = {
    email: "",
  };

  const validationSchemaMail = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required email"),
  });

  return (
    <div className="md:w-[70%] lg:w-[60%] max-sm:w-full sm:w-full md:ps-10 lg:ps-20 max-sm:px-10 sm:px-10 flex h-full flex-col">
      <p className="text-description-color text-lg font-medium">
        Welcome back!
      </p>
      <h2 className="text-primary-color pb-10 pt-2">Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            handleSubmit(values);
            // resetForm();
          }, 500);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Form className=" w-full">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-800"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={fieldNormal}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="name@gmail.com"
              />
              {touched.email && errors.email && (
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-2 text-sm text-red-600 dark:text-red-500"
                />
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-800"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder=""
                  className={fieldNormal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
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
            <div className="flex items-start">
              <button
                type="button"
                className="text-sm text-secondary-color hover:underline ml-auto cursor-pointer"
                onClick={() => router.push("/auth/forgetPassword")}
              >
                Forgot Password
              </button>
            </div>
            <h6 className="text-red-600 my-3">{invalidMsg}</h6>
            <div className="mt-5 flex flex-col items-center w-full justify-center">
              <button
                disabled={isSubmitting || (touched.password && errors.password)}
                type="submit"
                className="w-full bg-primary-color justify-center flex primaryButton px-28 cursor-pointer py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-primary rounded-3xl hover:bg-[#033A87] focus:outline-none "
              >
                {isLoading ? (
                  <div className="flex">
                    <p className="mr-2">Logging In</p>
                    <Image
                      width={24}
                      height={24}
                      className="w-6 h-6 animate-spin"
                      src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                      alt="Loading icon"
                    ></Image>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center items-center flex-col">
        <p className="my-3 text-description-color">OR</p>
        <div className={'w-full'}>
          <GoogleSignInBtn></GoogleSignInBtn>
        </div>
        <p className="pt-[20px] max-sm:text-center sm:text-center md:text-start text-text-color">
          Don&lsquo;t have an account yet?{" "}
          <Link
            href={"/auth/signup"}
            className="text-secondary-color font-semibold"
          >
            Sign up for free
          </Link>
        </p>
      </div>
      {showForgotPassword && (
        <Formik
          initialValues={initialValuesMail}
          validationSchema={validationSchemaMail}
          onSubmit={handleSubmitMail}
        >
          {({ isSubmitting }) => (
            <Form
              className="fixed z-10 inset-0 overflow-y-auto"
              onClick={handleCloseForgotPasswordModal}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

                <div
                  className="inline-block z-40 relative align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">
                      Forgot Password
                    </h1>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <p className="leading-relaxed">
                      Please enter your email address. We&apos;ll send you a
                      link to reset your password.
                    </p>

                    <div className="mt-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>

                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className={`block w-full shadow px-4 py-2 mt-2 border-none bg-white rounded-3xl ${
                          errorMessage
                            ? "bg-red-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                            : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        }`}
                      />

                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="min-w-min px-4 py-2 primaryButton tracking-wide text-white transition-colors duration-200 transform bg-gradient-primary rounded-3xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      >
                        Send Mail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
