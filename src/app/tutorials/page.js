"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import recommend from "@assets/images/recommend.png";
import { useCreateRequestTutorialMutation } from "@/store/features/request-tutorial/requestTutorialApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { toast } from "react-toastify";
import TutorialCard from "@/app/tutorials/components/TutorialCard";
import SelectButton from "@/components/buttons/SelectButton";
import CardTutorial from "@/app/tutorials/components/CardTutorial";

const Tutorial = () => {
  const resources = [
    {
      name: "AWS",
      url: "https://docs.aws.amazon.com/?nc2=h_ql_doc_do",
    },
    {
      name: "Data_analytics_introduction.pdf",
      url: "",
    },
    {
      name: "Data_cleansing.pdf",
      url: "",
    },
    {
      name: "Data_visualization.pdf",
      url: "",
    },
    {
      name: "Kaggle",
      url: "https://www.kaggle.com/",
    },
    {
      name: "Noble desktop",
      url: "https://www.nobledesktop.com/",
    },
    {
      name: "simplilearn",
      url: "https://www.simplilearn.com/",
    },
  ];

  // handle user input
  const [sendRequestTutorial] = useCreateRequestTutorialMutation();
  const { data: user } = useGetUserQuery();

  const handleSubmit = async (values) => {
    values.request_by = user?.data?.id;

    const submit = await sendRequestTutorial({ data: values });
    if (submit?.data) {
      toast.success("Request Tutorial successfully.");
    }
  };

  return (
    <section
      className={
        "md:pt-32 md:pb-20 max-sm:pt-40 dark:text-white max-sm:pb-6 sm:pb-6 sm:pt-40 lg:px-[10%] md:px-[7%] max-sm:px-8 sm:px-8"
      }
    >
      <h1
        className={
          "text-bold text-primary-color dark:text-third-color pt-10 md:pb-10 max-sm:pb-5 sm:pb-5"
        }
      >
        Tutorials
      </h1>
      {/*<TutorialCard />*/}
      <CardTutorial/>
      <h2
        className={
          "text-primary-color dark:text-third-color font-bold md:mt-20 max-sm:mt-12 sm:mt-12"
        }
      >
        Recommendation learning resources
      </h2>
      <div
        className={
          "lg:flex md:block justify-start gap-32 items-center md:py-20 max-sm:py-0 sm:py-0"
        }
      >
        <Image
          src={recommend}
          alt={"recommendation"}
          unoptimized={true}
          className={"lg:w-1/2 md:w-3/3 w-full h-[400px] object-contain"}
        />
        <ul className={"list-disc"}>
          {resources.map((item, index) => (
            <li key={index} className={"my-3 ml-10 text-lg font-medium"}>
              <a
                target={"_blank"}
                className={"hover:underline hover:text-primary-color"}
                href={item.url}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={"text-primary-color font-bold mt-10 dark:text-third-color"}>
          Request Tutorials
        </h2>
        <Formik
          initialValues={{
            request_by: user?.data?.id,
            message: "",
            subject: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.subject) {
              errors.subject = "Please input the subject!";
            }
            if (!values.message) {
              errors.message = "Message required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form
              className={
                "md:pb-6 pt-10 max-sm:pb-0 sm:pb-0 flex flex-col md:gap-4 max-sm:gap-5 sm:gap-5 relative"
              }
              // className={
              //   "md:pb-6 pt-10 max-sm:pb-0 sm:pb-0 flex flex-col md:gap-10 max-sm:gap-5 sm:gap-5 relative"
              // }
            >
              <div>
                <p className={"text-lg text-text-color font-semibold dark:text-third-color"}>
                  Subject
                </p>
                <Field
                  className={
                    "block dark:text-black w-full px-4 py-[8px] my-3 border-gray-200 border-1  bg-white rounded-xl"
                  }
                  type={"text"}
                  name={"subject"}
                  placeholder={"eg. How can I share my report to other?"}
                />
                <ErrorMessage
                  className={"text-red-500"}
                  name={"subject"}
                  component={"div"}
                />
              </div>
              <div>
                <p className={"text-lg text-text-color font-semibold dark:text-third-color"}>
                  Message
                </p>
                <Field
                  as={"textarea"}
                  className={
                    "block w-full dark:text-black px-4 py-[8px] h-[100px] my-3 border-gray-200 border-1  bg-white rounded-xl"
                  }
                  type={"text"}
                  name={"message"}
                  placeholder={
                    "Example: I recommend you explain me step by step about this subject and give me the sample with the real data..  "
                  }
                />
                <ErrorMessage
                  className={"text-red-500"}
                  name={"message"}
                  component={"div"}
                />
              </div>
              <div className=" flex justify-end">
                <SelectButton
                  rounded={"xl"}
                  height="46px"
                  color={"primary-color"}
                  clickAction={console.log("Please integrate with API")}
                  disabled={isSubmitting}
                  text="Send Message"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Tutorial;
