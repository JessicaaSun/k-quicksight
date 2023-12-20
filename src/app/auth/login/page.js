"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import Outlet from "@/middleware/Outlet";
import Loading from "@/app/loading";
import loginImg from "@assets/svg/login.svg";
import cactus from "@assets/svg/cactus.svg";
import Image from "next/image";
import FormLogin from "./components/Form";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  // if (status === "loading") {
  //   return <Loading />;
  // }
  return (
    <Outlet>
      <div className="min-h-screen lg:w-[65%] max-sm:w-full sm:w-full md:w-[80%] md:ms-5 sm:ms-0 flex items-center max-sm:justify-center sm:justify-center md:justify-start  bg-background-color">
        <FormLogin />

        <div className="min-h-screen fixed top-0 rounded-l-3xl right-0 z-10 md:flex sm:hidden max-sm:hidden justify-end items-center w-[32%] bg-[#5686EF]">
          <button
            onClick={() => router.push("/")}
            className="fixed top-5 z-30 right-10"
          >
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 4.3125C12.6958 4.3125 4.3125 12.6958 4.3125 23C4.3125 33.3042 12.6958 41.6875 23 41.6875C33.3042 41.6875 41.6875 33.3042 41.6875 23C41.6875 12.6958 33.3042 4.3125 23 4.3125ZM29.7661 27.7339C29.9052 27.866 30.0165 28.0247 30.0933 28.2005C30.1701 28.3763 30.2109 28.5658 30.2134 28.7576C30.2159 28.9495 30.1799 29.1399 30.1076 29.3176C30.0353 29.4954 29.9282 29.6568 29.7925 29.7925C29.6568 29.9282 29.4954 30.0353 29.3176 30.1076C29.1399 30.1799 28.9495 30.2159 28.7576 30.2134C28.5658 30.2109 28.3763 30.1701 28.2005 30.0933C28.0247 30.0165 27.866 29.9052 27.7339 29.7661L23 25.0332L18.2661 29.7661C17.9944 30.0243 17.6325 30.1662 17.2576 30.1614C16.8828 30.1566 16.5246 30.0055 16.2596 29.7404C15.9945 29.4754 15.8434 29.1172 15.8386 28.7424C15.8338 28.3675 15.9757 28.0056 16.2339 27.7339L20.9668 23L16.2339 18.2661C15.9757 17.9944 15.8338 17.6325 15.8386 17.2576C15.8434 16.8828 15.9945 16.5246 16.2596 16.2596C16.5246 15.9945 16.8828 15.8434 17.2576 15.8386C17.6325 15.8338 17.9944 15.9757 18.2661 16.2339L23 20.9668L27.7339 16.2339C28.0056 15.9757 28.3675 15.8338 28.7424 15.8386C29.1172 15.8434 29.4754 15.9945 29.7404 16.2596C30.0055 16.5246 30.1566 16.8828 30.1614 17.2576C30.1662 17.6325 30.0243 17.9944 29.7661 18.2661L25.0332 23L29.7661 27.7339Z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
        <Image
          src={loginImg}
          alt="login"
          width={200}
          height={200}
          className="w-[45%] md:flex sm:hidden max-sm:hidden absolute bottom-0 right-[7rem] z-20 h-auto"
        />
      </div>
    </Outlet>
  );
}
