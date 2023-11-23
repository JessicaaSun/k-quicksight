"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import heroImg from "@assets/images/home_hero.png";
import Card_Why from "@/components/cards/Card";
import GetStart_boxs, { User_base } from "@/components/cards/HomeBoxs";
import DeckCard from "@/components/cards/deck-card/DeckCard";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useLoginWithGoogleMutation } from "@/store/features/auth/authApiSlice";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();

  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();
  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      console.log("session:", session)
      const fetchData = async () => {
        try {
          const { data } = await loginWithGoogle({
            auth_token: session.auth_token,
          }).unwrap();
          dispatch(setCredentials(data));
          // Navigate to the welcome page
        } catch (error) {
          // Handle any errors that occur during the API call
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [dispatch, loginWithGoogle, session]);
  return (
    <main className="pt-24 flex flex-col gap-20 max-sm:gap-0 overflow-x-hidden">
      <section className="lg:flex md:flex block gap-5 justify-between items-center px-[10%] mt-10 py-14 sm:py-12 max-sm:py-12">
        <div className="flex flex-col gap-3 w-full">
          <div className=" lg:text-5xl md:text-4xl text-3xl font-bold">
            <p className="leading-[65px] max-sm:leading-normal sm:leading-normal">
            Discover, Analyze and Decide With{" "}
            <span className=" text-primary-color">
              K-QuickSight
            </span>
            </p>
          </div>
          <p className="text-description-color text-lg">
            Catalyze your data journey with our powerful tools for discovery,
            analysis, and informed decision-making. Explore your data full
            potential and drive success with confidence.
          </p>
          <div className="w-full pt-6 flex gap-5">
            {!user ? (
              <Button
                onClick={() => router.push("/auth/login")}
                className="w-[184px] font-bold bg-primary-color text-white"
              >
                Get started
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/board/recent")}
                className="w-[184px] font-bold bg-primary-color text-white"
              >
                Go To Board
              </Button>
            )}

            <Button
              onClick={() => router.push("/tutorials")}
              className="min-w-[217px] font-bold text-text-color bg-white border-1 border-gray-300 flex gap-5"
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 2.03003C0 1.02557 0.95939 0.211304 2.14286 0.211304H17.8571C19.0406 0.211304 20 1.02557 20 2.03003V15.3673C20 16.3717 19.0406 17.186 17.8571 17.186H2.14286C0.95939 17.186 0 16.3717 0 15.3673V2.03003ZM7.07703 5.84497V11.7221C7.07763 11.8205 7.10886 11.9169 7.16753 12.0017C7.2262 12.0865 7.31024 12.1566 7.41114 12.205C7.51203 12.2533 7.62619 12.2781 7.74204 12.277C7.8579 12.2758 7.97133 12.2487 8.07083 12.1983L14.0016 9.25971C14.1015 9.21074 14.1844 9.14033 14.242 9.05556C14.2997 8.97079 14.33 8.87463 14.33 8.77675C14.33 8.67887 14.2997 8.58272 14.242 8.49794C14.1844 8.41317 14.1015 8.34276 14.0016 8.29379L8.07083 5.36882C7.97133 5.31845 7.8579 5.29131 7.74204 5.29013C7.62619 5.28897 7.51203 5.31381 7.41114 5.36214C7.31024 5.41048 7.2262 5.48061 7.16753 5.5654C7.10886 5.65019 7.07763 5.74664 7.07703 5.84497Z"
                  fill="#0346A5"
                />
              </svg>
              Watch tutorials
            </Button>
          </div>
        </div>
        <div className="lg:w-2/3 md:w-1/2 w-full mt-10">
          <Image src={heroImg} priority={false} alt="hero" className="homepage_image w-full" />
        </div>
      </section>
      <section className="bg-secondary-color min-w-full px-10 py-20">
        <h2 className="text-third-color text-center">
          Why <span className="text-background-color">K-QuickSight</span>
        </h2>
        <Card_Why />
      </section>
      <section className="w-full py-20 px-[10%]">
        <h2 className="text-primary-color font-bold text-center">
          Getting started with K-QuickSight
        </h2>
        <GetStart_boxs />
      </section>
      <section className="pb-32 w-full lg:px-[10%] md:px-[5%] px-3">
        <User_base />
      </section>
      <section className="bg-secondary-color px-3 flex flex-col justify-center items-center py-20 w-full">
        <h2 className="text-background-color">What Our Users Say</h2>

        <p className="text-background-color mb-12 font-normal lg:w-[40%] md:w-2/3 w-full mt-4 text-center">
          At K-QuickSight, we&apos;re dedicated to exceptional business
          analytics. But you don&apos;t have to take our word for it hear from
          our delighted users.
        </p>
        <DeckCard />
      </section>
    </main>
  );
}
