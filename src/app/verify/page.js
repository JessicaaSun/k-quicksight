"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const newCode = [...code];
    newCode[e.target.id] = e.target.value;
    setCode(newCode.join(""));
  };

  const handleSubmit = () => {
    // Send the code to the server using an HTTP request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    };

    fetch("/api/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Registration successful!");
        } else {
          console.error("Registration failed:", data.error);
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
