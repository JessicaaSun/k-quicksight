"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import Image from "next/image";
import { generateBashURL } from "@/utils/util";

export default function UploadImageZone({
  previewImage,
  setPreviewImage,
  handleUpload,
  thumbnailUrl,
}) {
  function DropFileZone({ field, form }) {
    return (
      <div className="w-[400px] h-[400px] relative ">
        <input
          id="dropzone-file"
          type="file"
          name="file"
          onChange={handleUpload}
          className="hidden"
        />

        <Image
          priority={false}
          width={400}
          height={400}
          src={generateBashURL(previewImage || thumbnailUrl)}
          alt="preview"
          className="rounded-xl  border-2 border-gray-300 border-dashed h-full w-full object-cover"
        />
      </div>
    );
  }

  const FILE_SIZE = 1024 * 1024 * 10; // 10MB
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .test("fileSize", "File too large", (value) => {
        if (!value) {
          return true;
        }
        return value.size <= FILE_SIZE;
      })
      .test("fileFormat", "Unsupported Format", (value) => {
        if (!value) {
          return true;
        }
        return SUPPORTED_FORMATS.includes(value.type);
      }),
  });

  return (
    <>
      <div>
        <Formik
          initialValues={{
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpload}
        >
          {({ isSubmitting }) => (
            <Form className={`flex flex-col w-full`}>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex relative flex-col items-center justify-center w-full h-[400px]  rounded-xl cursor-pointer bg-gray-50   "
                >
                  <div
                    className={` flex flex-col z-10 absolute items-center justify-center`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500  ">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500  ">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Field
                    id="dropzone-file"
                    name="file"
                    type="file"
                    className="hidden"
                    component={DropFileZone}
                  />
                </label>
              </div>
              <ErrorMessage name="file">
                {(msg) => <div className="text-red-600">{msg}</div>}
              </ErrorMessage>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
