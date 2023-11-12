import React from "react";
import NewspaperIcon from "@/components/icons/NewspaperIcon";
import heroImg from "@assets/images/about/about-hero.png"
import Image from "next/image";

const About = () => {
  return (
    <main className="md:px-[160px] py-40 text-center bg-background-color">
      <section>
        <div className="flex items-center flex-col gap-3 justify-center">
          <div className="flex justify-center gap-4">
            <NewspaperIcon></NewspaperIcon>
            <h1 className="text-primary-color max-sm:text-xl lg:text-4xl md:text-3xl sm:text-2xl">
              About K-QuickSight
            </h1>
          </div>

          <p className="text-description-color pt-2 text-center md:w-1/2 text-[18px]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <Image src={heroImg} className="w-3/4" alt='about-hero'></Image>
        </div>
      </section>
    </main>
  );
};

export default About;
