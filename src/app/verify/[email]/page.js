"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Verify({params}) {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const newCode = [...code];
    newCode[e.target.id] = e.target.value;
    setCode(newCode.join(""));
  };

  const handleSubmit = (e) => {
    // Send the code to the server using an HTTP request
    e.preventDefault();
    setErrorMessage('');

    const data = {
      email: decodeURIComponent(params.email),
      verification_code: code,
    };

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}accounts/verify/`, data)
        .then(function (response) {
          console.log(response);
          router.push("/auth/login")
        })
        .catch(function (error) {
          console.log(error);
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage('An error occurred. Please try again.');
          }
        });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-56">
      <div className={"grid grid-cols-2 place-items-center gap-16"}>
        <div className={"grid grid-cols-1 place-items-center"}>
          <h1 className={"text-primary-color text-center"}>
            Verify your email address
          </h1>
          <div className={"grid grid-cols-6 gap-4 mt-14 mb-8 text-center"}>
            <Input
              isRequired
              id="0"
              className={"w-14 shadow-md rounded-2xl"}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              id="1"
              className={"w-14 shadow-md rounded-2xl"}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              id="2"
              className={"w-14 shadow-md rounded-2xl"}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              id="3"
              className={"w-14 shadow-md rounded-2xl"}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              id="4"
              className={"w-14 shadow-md rounded-2xl"}
              onChange={handleInputChange}
            />
            <Input
              isRequired
              id="5"
              className={"w-14 shadow-md rounded-2xl"}
              onChange={handleInputChange}
            />
          </div>

          <Button
            radius="md"
            className={"w-full text-[18px] bg-primary-color text-white"}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <div className={"mt-4 flex justify-center items-center"}>
            <p className="text-[18px]">or</p>
          </div>
          <Button
            variant="bordered"
            className={"mt-2 w-full text-[18px] text-primary-color"}
          >
            Sign up again
          </Button>
          <div className={"flex mt-4"}>
            <p>Already have an account?</p>
            <p
              className={"font-bold cursor-pointer flex text-primary-color ps-1"}
              onClick={() => router.push("/auth/login")}
            >
              Login
            </p>
          </div>
        </div>

        {/*image div*/}
        <div>
          <Image
            src={"/assets/images/authentication.png"}
            alt={"authentication"}
            height={600}
            width={600}
          />
        </div>
      </div>
    </main>
  );
}
