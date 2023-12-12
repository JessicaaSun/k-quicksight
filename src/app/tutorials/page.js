"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import recommend from "@assets/images/recommend.png";
import { useCreateRequestTutorialMutation } from "@/store/features/request-tutorial/requestTutorialApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { toast } from "react-toastify";
import TutorialCard from "@/app/tutorials/components/TutorialCard";

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
    <section className={"py-44 px-[10%]"}>
      <h1 className={"text-bold text-primary-color pt-10 pb-10"}>Tutorials</h1>
      <TutorialCard />
      <h2 className={"text-primary-color font-bold mt-20"}>
        Recommendation learning resources
      </h2>
      <div
        className={"lg:flex md:block justify-start gap-32 items-center py-20"}
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
        <h2 className={"text-primary-color font-bold mt-10"}>
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
            <Form className={"py-10 flex flex-col gap-10 relative"}>
              <div>
                <p className={"text-lg text-text-color font-semibold"}>
                  Subject
                </p>
                <Field
                  className={
                    "w-full px-5 py-2 my-3 bg-gray-50 rounded-xl border-2 border-gray-400"
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
                <p className={"text-lg text-text-color font-semibold"}>
                  Message
                </p>
                <Field
                  as={"textarea"}
                  className={
                    "w-full h-[200p x] overflow-y-scroll resize-y px-5 py-5 my-3 bg-gray-50 rounded-xl border-2 border-gray-400"
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

              <Button
                type={"submit"}
                disabled={isSubmitting}
                className={
                  "font-bold text-white bg-primary-color absolute right-0 -bottom-5 rounded-xl w-fit py-2 px-12"
                }
              >
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Tutorial;
