import React from "react";
import Image from "next/image";
import mission from "@assets/images/mission_(2).png";
import vision from "@assets/images/vision_(2).png";
import Reksmey from "@assets/teams/reksmey.png";
import tara from "@assets/teams/kit-tara.png";
import jessica from "@assets/teams/jessica.png";
import ChenTo from "@assets/teams/chento.png";
import SoBun from "@assets/teams/sobon.png";
import SeangLeng from "@assets/teams/seangleng.png";
import Sophearum from "@assets/teams/phearum.png";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import logo from "@assets/logos/logo.png";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";

export default function AboutUs() {
  const data = [
    {
      image: mission,
      title: "Our Mission",
      description:
        "K-QuickSight is on a mission to redefine data analysis. We're dedicated to delivering accessible, powerful tools that enable individuals and organizations, regardless of their technical proficiency, to unlock their data's full potential. Our commitment is to make data analysis an empowering journey for all.",
    },
    {
      image: vision,
      title: "Our Vision",
      description:
        "At K-QuickSight, we envision democratizing data analysis, making it accessible and transformative for all. We aim to empower businesses with intuitive and advanced tools, facilitating data-driven decision-making and fostering success.",
    },
  ];
  const members = [
    {
      profile: jessica,
      name: "Sun Jessica",
      position: "Fullstack",
      facebook: "https://www.facebook.com/profile.php?id=100010500511225",
      instagram: "https://www.instagram.com/jessblueo3o/",
      github: "https://github.com/JessicaaSun",
    },
    {
      profile: ChenTo,
      name: "Chea Chento",
      position: "Backend",
      facebook: "",
      instagram: "",
      github: "",
    },
    {
      profile: SoBun,
      name: "Phon Sobon",
      position: "Frontend",
      facebook: "https://www.facebook.com/sobon.phon/?_rdc=1&_rdr",
      instagram: "",
      github: "https://github.com/PhonSobon?tab=repositories",
    },
    {
      profile: SeangLeng,
      name: "Seng SeangLeng",
      position: "Frontend",
      facebook: "https://www.facebook.com/profile.php?id=100086488516436",
      instagram: "https://www.instagram.com/chheng_jenzy/",
      github: "https://github.com/SeangLeng",
    },
    {
      profile: Sophearum,
      name: "Sorn Sophearum",
      position: "Frontend",
      facebook: "https://web.facebook.com/sophearum.sorn",
      instagram: "https://www.instagram.com/rum_sorn/?hl=en",
      github: "https://github.com/sirbluee",
    },
  ];
  return (
    <section
      className={
        "md:py-32 md:px-0 max-sm:px-8 sm:px-8 max-sm:pt-40 sm:pt-40 flex flex-col items-center"
      }
    >
      <div data-aos="fade-down" className={"flex gap-5 max-sm:flex-col sm:flex-col md:flex-row justify-center items-center md:pt-7 max-sm:pt-7 sm:pt-0"}>
        <Image width={100} unoptimized={true} height={100} className="md:w-[100px] max-sm:w-[200px] sm:w-[200px] h-auto" src={logo} alt={"logo"} />
        <h1
          className={
            "text-primary-color dark:text-third-color md:text-4xl max-sm:text-3xl sm:text-3xl capitalize"
          }
        >
          about k-quicksight
        </h1>
      </div>
      <div className={"flex justify-center items-center"} data-aos="fade-down">
        <p
          className={
            "text-description-color dark:text-white/80 text-center mt-5 text-lg lg:w-1/2 md:w-2/3"
          }
        >
          A dynamic data analytics platform designed to empower users with
          powerful tools for data analysis, cleansing, visualization, and
          decision-making.
        </p>
      </div>
      <Image
        data-aos="fade-down"
        src="/assets/images/about-hero.png"
        unoptimized={true}
        width={820}
        height={820}
        alt={"about"}
      />
      <div className={"my-10 lg:px-[8%] md:px-5 px-3"}>
        <p
          className={
            "text-4xl dark:text-third-color capitalize text-primary-color font-bold text-center md:text-4xl max-sm:text-3xl sm:text-3xl md:mt-10 lg:my-10"
          }
        >
          Mission and vision
        </p>
        {data.map((e, index) => (
          <div
            key={index}
            data-aos={index % 2 === 0 ? "zoom-out-right" : "zoom-in-left"}
            className={`lg:flex w-full md:flex justify-center gap-16 items-center md:pt-10 lg:pt-0 ${
              index === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <Image
              src={e.image}
              alt={e.title}
              unoptimized={true}
              className={"lg:w-1/3 md:w-1/3"}
            />
            <div className={`${index === 1 ? "text-right" : " "} `}>
              <h2 className={"text-primary-color dark:text-third-color"}>
                {e.title}
              </h2>
              <p
                className={
                  "mt-4 sm:text-lg max-sm:text-lg dark:text-white/80 text-description-color lg:text-xl"
                }
              >
                {e.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={"md:px-[10%] max-sm:px-0 sm:px-0 "}>
        <p
          className={
            " text-primary-color dark:text-third-color md:text-4xl max-sm:text-3xl sm:text-3xl font-bold text-center my-10"
          }
        >
          Our mentors
        </p>
        <div className={"lg:flex w-full justify-center items-center"}>
        <p
            className={
              "lg:hidden mt-5 text-center dark:text-white/80 text-lg text-description-color"
            }
          >
            Meet the driving force behind our success.{" "}
            <span className={"font-semibold"}>Our mentors</span> are experts in
            data analysis and technology. They shape our vision, ensuring we
            deliver excellence in data analytics
          </p>
          <div
            className={
              "lg:flex md:flex justify-center items-center gap-5 mt-10"
            }
          >
            <div className={"lg:w-1/3 sm:w-full md:w-2/3"}>
              <Image
                src={Reksmey}
                width={200}
                height={200}
                unoptimized={true}
                className="w-full"
                alt={"instructor RakSmey"}
              />
              <h3
                className={
                  "text-center dark:text-white/80 my-5 text-text-color"
                }
              >
                Ms. Mom Reksmey
              </h3>
            </div>
            <div className={"lg:w-1/3 sm:w-full md:w-2/3"}>
              <Image
                width={200}
                height={200}
                src={tara}
                className="w-full"
                unoptimized={true}
                alt={"instructor Tara"}
              />
              <h3
                className={
                  "text-center dark:text-white/80 my-5 text-text-color"
                }
              >
                Mr. Kit Tara
              </h3>
            </div>
          </div>
          <p
            className={
              "lg:w-1/2 lg:block sm:hidden max-sm:hidden dark:text-white/80 text-lg text-description-color"
            }
          >
            Meet the driving force behind our success.
            <span className={"font-semibold"}>Our mentors</span> are experts in
            data analysis and technology. They shape our vision, ensuring we
            deliver excellence in data analytics
          </p>
        </div>
        <p
          className={
            "md:text-4xl dark:text-third-color max-sm:text-3xl sm:text-3xl text-primary-color font-bold text-center max-sm:mt-12 sm:mt-12 max-sm:mb-0 sm:mb-0 md:my-20"
          }
        >
          Our Members
        </p>
        <div className={"flex flex-wrap justify-around items-center"}>
          {members.map((e, index) => (
            <div key={index} className={"lg:w-1/4 md:w-1/3 m-10 "}>
              <Image
                src={e.profile}
                unoptimized={true}
                alt={e.name}
                className="md:py-0 max-sm:py-7 sm:py-7"
              />
              <h3
                className={
                  "text-text-color dark:text-white md:text-xl max-sm:text-lg sm:text-lg text-center capitalize"
                }
              >
                {e.name}
              </h3>
              <p
                className={
                  "text-primary-color font-semibold dark:text-third-color text-center text-lg mt-2"
                }
              >
                {e.position}
              </p>
              <div
                className={"flex gap-[33px] justify-center items-center mt-5"}
              >
                <Tooltip
                  className={"bg-white"}
                  showArrow={true}
                  content={`${e.name} facebook`}
                >
                  <Link
                    target="_blank"
                    href={e.facebook}
                    className={"hover:scale-110 transition-all dark:text-white"}
                  >
                    <FaFacebook className={"text-2xl"} />
                  </Link>
                </Tooltip>

                <Tooltip
                  className={"bg-white"}
                  showArrow={true}
                  content={`${e.name} Instagram`}
                >
                  <Link
                    target="_blank"
                    href={e.instagram}
                    className={"hover:scale-110 transition-all dark:text-white"}
                  >
                    <GrInstagram className={"text-2xl"} />
                  </Link>
                </Tooltip>

                <Tooltip
                  className={"bg-white"}
                  showArrow={true}
                  content={`${e.name} GitHub`}
                >
                  <Link
                    target="_blank"
                    href={e.github}
                    className={"hover:scale-110 transition-all dark:text-white"}
                  >
                    <FaGithub className={"text-2xl"} />
                  </Link>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
