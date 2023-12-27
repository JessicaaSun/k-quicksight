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
import { MdOutlineOndemandVideo } from "react-icons/md";
import GettingStart from "@/components/home/GettingStart";

export default function Home() {
  const router = useRouter();

  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();
  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const { data } = await loginWithGoogle({
            auth_token: session.auth_token,
          }).unwrap();
          dispatch(setCredentials(data));
          // Navigate to the welcome page
        } catch (error) {
          // Handle any errors that occur during the API call
          console.error("Error fetching user data:");
        }
      };
      fetchData();
    }
  }, [dispatch, loginWithGoogle, session]);
  return (
    <main className="pt-24 flex flex-col lg:gap-20 max-sm:gap-0 sm:gap-0  overflow-x-hidden">
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-5 justify-between items-center lg:px-[10%] md:px-[8%] sm:px-8 max-sm:px-8 mt-10 md:pt-10 lg:pt-8 pb-0 lg:pb-0 md:pb-6 xl:pt-0 sm:pt-14 max-sm:pt-14">
        <div
          className="flex flex-col gap-3 w-full"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <div className=" lg:text-5xl md:text-4xl text-[28px] font-bold">
            <p className="leading-[65px] text-text-color dark:text-white max-sm:leading-normal sm:leading-normal">
              Discover, Analyze and Decide With{" "}
              <span className="dark:bg-gradient-to-r dark:from-third-color dark:to-secondary-color bg-gradient-to-r from-primary-color to-secondary-color bg-clip-text whitespace-nowrap text-transparent">
                K-QuickSight
              </span>
            </p>
          </div>
          <p className="text-description-color text-lg dark:text-white">
            Catalyze your data journey with our powerful tools for discovery,
            analysis, and informed decision-making. Explore your data full
            potential and drive success with confidence.
          </p>
          <div className="w-full pt-6 flex max-sm:gap-3 sm:gap-3 gap-5">
            {!user ? (
              <Button
                size={"lg"}
                onClick={() => router.push("/auth/login")}
                className="md:w-[184px] max-sm:w-[40%] sm:w-[40%] font-bold bg-primary-color dark:bg-third-color text-white"
              >
                Get started
              </Button>
            ) : (
              <Button
                size={"lg"}
                onClick={() => router.push("/board/dataset")}
                className="md:w-[184px]  max-sm:w-[40%] sm:w-[40%] font-bold bg-primary-color text-white"
              >
                Go To Board
              </Button>
            )}

            <Button
              className={"font-semibold text-text-color dark:text-white"}
              onClick={() => router.push("/tutorials")}
              size={"lg"}
              variant={"bordered"}
            >
              <MdOutlineOndemandVideo className={"text-third-color text-xl"} />{" "}
              Watch Tutorial
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <Image
            src={heroImg}
            priority={false}
            unoptimized={true}
            alt="hero"
            className="homepage_image w-full"
          />
        </div>
      </section>
      <section className="bg-secondary-color dark:bg-dark-bg min-w-full px-10 py-20">
        <h2 className="text-third-color text-center">
          Why <span className="text-background-color">K-QuickSight</span>
        </h2>
        <div>
          <Card_Why />
        </div>
      </section>
      <section className="w-full md:pt-10 max-sm:pt-16 sm:pt-16 max-sm:pb-0 sm:pb-0 md:px-[10%] sm:px-8 max-sm:px-8">
        <h2 className="text-primary-color dark:text-white font-bold text-center">
          Begin Your Adventure
        </h2>
        <p className={'text-description-color font-normal text-center dark:text-white my-3 text-lg'}>Starting with K-QuickSight, the new product of data analytics field. </p>
        <GetStart_boxs />
      </section>

      <section id={'gettingStart'} className={'w-full'}>
        <h2 className={'my-16 text-center dark:text-white text-primary-color'}>Getting Started with <span className={'text-secondary-color whitespace-nowrap dark:text-white'}>K-Quicksight</span></h2>
        <GettingStart />
      </section>
        
      <section className="pb-32 max-sm:pb-16 sm:pb-16 w-full md:px-[10%] sm:px-8 max-sm:px-8 px-3">
        <User_base />
      </section>
      <section className="bg-secondary-color dark:bg-dark-bg px-3 flex flex-col justify-center items-center max-sm:py-16 sm:py-16 py-20 w-full">
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
