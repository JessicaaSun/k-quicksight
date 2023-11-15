"use client";

import React, { useState } from "react";
import box_1 from "@assets/images/Getting_started.png";
import box_2 from "@assets/images/guideline.png";
import box_3 from "@assets/images/community.png";
import userbase from "@assets/images/userbase.png";
import Image from "next/image";
import jessi_profile from "@assets/teams/jessi_profile.jpg";
import { Button } from "@nextui-org/react";
export default function GetStart_boxs() {
  const data = [
    {
      id: 1,
      svg: (
        <svg
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="51" cy="51" r="51" fill="white" />
          <path
            d="M69.2364 27.9421L58.7808 35.6558L54.1503 37.8055L52.4028 39.4747L33.3917 36.6049L36.2684 33.857C37.1179 33.0456 37.6354 32.1782 37.3959 31.9275C37.1564 31.6767 36.2662 32.154 35.4168 32.9654L27.0675 40.9405L27.9192 41.8321L29.0842 40.7193L40.7232 52.9043L37.2282 56.2427L26.6964 54.9356L24.1723 57.3466L24.1526 58.881L29.0732 64.0324L29.6557 63.476L30.7912 64.6648L34.2862 61.3263L34.4754 61.5244L30.3832 66.57L33.4112 69.7402L38.639 65.8833L38.8283 66.0815L35.3333 69.4199L36.4688 70.6087L35.8863 71.1651L40.8068 76.3164L42.3406 76.3671L44.8648 73.956L44.0413 63.3754L47.5363 60.037L59.1754 72.222L58.0104 73.3348L58.862 74.2264L67.2113 66.2513C68.0608 65.4398 68.5783 64.5725 68.3388 64.3218C68.0992 64.071 67.2091 64.5483 66.3596 65.3597L63.4829 68.1075L61.4869 48.9849L63.2344 47.3157L65.5939 42.7885L73.7785 32.6973C79.2545 24.4354 78.8819 24.0453 78.4974 23.6429C78.113 23.2404 77.7404 22.8503 69.2364 27.9421Z"
            fill="#0346A5"
          />
        </svg>
      ),
      title: "Getting started with K-QuickSight",
      description:
        "Gain insights from your data by accessing your step-by-step guide.",
      out_number: (
        <svg
          width="141"
          height="95"
          viewBox="0 0 141 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.588 0.277777H47.675C51.1683 0.277777 54.0503 0.539779 56.321 1.06378C58.679 1.58778 60.6877 2.63578 62.347 4.20778C64.0937 5.77978 65.4037 7.57012 66.277 9.57878C67.2377 11.5001 67.98 14.4694 68.504 18.4868C69.29 24.5128 69.683 34.1631 69.683 47.4378V47.8308C69.683 67.8301 68.6787 80.2314 66.67 85.0348C64.6613 90.1001 61.7793 93.1568 58.024 94.2048C56.0153 94.7288 53.5263 94.9908 50.557 94.9908H37.588V82.5458H42.042C44.3127 82.5458 45.7537 82.2401 46.365 81.6288C47.0637 81.0174 47.413 80.0568 47.413 78.7468V16.5218C47.413 15.2118 47.0637 14.2511 46.365 13.6398C45.7537 13.0284 44.3127 12.7228 42.042 12.7228H37.588V0.277777ZM32.348 12.7228H27.894C25.6233 12.7228 24.1387 13.0284 23.44 13.6398C22.8287 14.2511 22.523 15.2118 22.523 16.5218V78.7468C22.523 80.0568 22.8287 81.0174 23.44 81.6288C24.1387 82.2401 25.6233 82.5458 27.894 82.5458H32.348V94.9908H19.379C12.829 94.9908 8.06933 92.9821 5.1 88.9648C2.65467 85.7334 1.17 78.3101 0.646 66.6948C0.384 62.1534 0.253 55.8654 0.253 47.8308V47.4378C0.253 26.9144 1.34467 14.2948 3.528 9.57878C4.48867 7.57012 5.79867 5.77978 7.458 4.20778C9.20467 2.63578 11.2133 1.58778 13.484 1.06378C15.842 0.539779 18.7677 0.277777 22.261 0.277777H32.348V12.7228ZM105.348 0.277777H119.103C122.072 0.277777 123.993 0.758112 124.867 1.71878C125.827 2.67945 126.308 4.68811 126.308 7.74478V79.9258H136.919C138.229 79.9258 139.102 80.1004 139.539 80.4498C139.975 80.7991 140.194 81.4541 140.194 82.4148V94.9908H110.064C108.666 94.9908 107.531 94.5541 106.658 93.6808C105.784 92.7201 105.348 91.4538 105.348 89.8818V0.277777ZM101.418 94.9908H82.4228V82.4148C82.4228 81.4541 82.6411 80.7991 83.0778 80.4498C83.5144 80.1004 84.3878 79.9258 85.6978 79.9258H101.418V94.9908ZM101.418 15.3428H87.0078C84.8244 15.3428 83.7328 14.1201 83.7328 11.6748V0.277777H101.418V15.3428Z"
            fill="#F59F00"
          />
        </svg>
      ),
      out_image: box_1,
    },
    {
      id: 2,
      svg: (
        <svg
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="51" cy="51" r="51" fill="white" />
          <path
            d="M56.1429 36.1406V21H33.8214C32.3371 21 31.1429 22.1912 31.1429 23.6719V49.5H24.8929C24.4018 49.5 24 49.9008 24 50.3906V52.1719C24 52.6617 24.4018 53.0625 24.8929 53.0625H40.6183C40.9531 53.0625 41.2656 53.2518 41.4219 53.5523L43.6429 57.9832L49.9821 45.3252C50.3058 44.6684 51.2545 44.6684 51.5781 45.3252L55.4509 53.0625H63.2857C64.2679 53.0625 65.0714 53.8641 65.0714 54.8438C65.0714 55.8234 64.2679 56.625 63.2857 56.625H53.2522L50.7857 51.7043L44.4464 64.3623C44.1228 65.0191 43.1741 65.0191 42.8504 64.3623L38.9665 56.625H31.1429V75.3281C31.1429 76.8088 32.3371 78 33.8214 78H71.3214C72.8058 78 74 76.8088 74 75.3281V38.8125H58.8214C57.3482 38.8125 56.1429 37.6102 56.1429 36.1406ZM73.2188 32.6895L62.2924 21.7793C61.7902 21.2783 61.1094 21 60.3951 21H59.7143V35.25H74V34.5709C74 33.8695 73.721 33.1904 73.2188 32.6895Z"
            fill="#0346A5"
          />
        </svg>
      ),
      title: "Guideline",
      description:
        "We will provide document for the you do know insight all of our service.",
      out_number: (
        <svg
          width="150"
          height="96"
          viewBox="0 0 150 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.588 0.828986H47.675C51.1683 0.828986 54.0503 1.09099 56.321 1.61499C58.679 2.13899 60.6877 3.18699 62.347 4.75899C64.0937 6.33099 65.4037 8.12132 66.277 10.13C67.2377 12.0513 67.98 15.0207 68.504 19.038C69.29 25.064 69.683 34.7143 69.683 47.989V48.382C69.683 68.3813 68.6787 80.7827 66.67 85.586C64.6613 90.6513 61.7793 93.708 58.024 94.756C56.0153 95.28 53.5263 95.542 50.557 95.542H37.588V83.097H42.042C44.3127 83.097 45.7537 82.7913 46.365 82.18C47.0637 81.5687 47.413 80.608 47.413 79.298V17.073C47.413 15.763 47.0637 14.8023 46.365 14.191C45.7537 13.5797 44.3127 13.274 42.042 13.274H37.588V0.828986ZM32.348 13.274H27.894C25.6233 13.274 24.1387 13.5797 23.44 14.191C22.8287 14.8023 22.523 15.763 22.523 17.073V79.298C22.523 80.608 22.8287 81.5687 23.44 82.18C24.1387 82.7913 25.6233 83.097 27.894 83.097H32.348V95.542H19.379C12.829 95.542 8.06933 93.5333 5.1 89.516C2.65467 86.2847 1.17 78.8613 0.646 67.246C0.384 62.7047 0.253 56.4167 0.253 48.382V47.989C0.253 27.4657 1.34467 14.846 3.528 10.13C4.48867 8.12132 5.79867 6.33099 7.458 4.75899C9.20467 3.18699 11.2133 2.13899 13.484 1.61499C15.842 1.09099 18.7677 0.828986 22.261 0.828986H32.348V13.274ZM128.142 0.828986H137.967C145.39 0.828986 149.102 5.06465 149.102 13.536V46.81C149.102 54.67 145.259 58.6 137.574 58.6H119.496V46.155H124.605C126.177 46.155 127.137 45.893 127.487 45.369C127.923 44.7577 128.142 43.7533 128.142 42.356V0.828986ZM114.256 58.6H110.588C109.016 58.6 108.011 58.9057 107.575 59.517C107.225 60.041 107.051 61.0017 107.051 62.399V95.542H95.9158C91.6364 95.542 88.9291 94.8433 87.7938 93.446C86.6584 92.0487 86.0908 88.5553 86.0908 82.966V55.325C86.0908 51.4823 86.7458 48.9933 88.0558 47.858C89.3658 46.7227 92.1168 46.155 96.3088 46.155H114.256V58.6ZM145.827 80.477C148.01 80.477 149.102 81.6997 149.102 84.145V95.542H112.422L112.291 80.477H145.827ZM122.902 13.274H110.457C108.623 13.274 107.487 13.5797 107.051 14.191C106.614 14.715 106.396 15.7193 106.396 17.204V31.745H91.9858C88.7544 31.745 86.8331 31.483 86.2218 30.959C85.6978 30.435 85.4358 28.8193 85.4358 26.112V14.846C85.4358 10.0427 86.1344 6.50566 87.5318 4.23499C89.0164 1.96432 92.2041 0.828986 97.0948 0.828986H122.902V13.274Z"
            fill="#F59F00"
          />
        </svg>
      ),
      out_image: box_2,
    },
    {
      id: 3,
      svg: (
        <svg
          width="102"
          height="102"
          viewBox="0 0 102 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="51" cy="51" r="51" fill="white" />
          <path
            d="M38.2 51.015C44.39 51.015 49.4 45.8674 49.4 39.5075C49.4 33.1476 44.39 28 38.2 28C32.01 28 27 33.1476 27 39.5075C27 45.8674 32.01 51.015 38.2 51.015ZM45.88 54.3029H45.05C42.97 55.3303 40.66 55.9468 38.2 55.9468C35.74 55.9468 33.44 55.3303 31.35 54.3029H30.52C24.16 54.3029 19 59.6045 19 66.1391V69.0982C19 71.821 21.15 74.03 23.8 74.03H52.6C55.25 74.03 57.4 71.821 57.4 69.0982V66.1391C57.4 59.6045 52.24 54.3029 45.88 54.3029ZM67 51.015C72.3 51.015 76.6 46.5969 76.6 41.1514C76.6 35.7059 72.3 31.2879 67 31.2879C61.7 31.2879 57.4 35.7059 57.4 41.1514C57.4 46.5969 61.7 51.015 67 51.015ZM71.8 54.3029H71.42C70.03 54.796 68.56 55.1248 67 55.1248C65.44 55.1248 63.97 54.796 62.58 54.3029H62.2C60.16 54.3029 58.28 54.9091 56.63 55.8851C59.07 58.5873 60.6 62.1732 60.6 66.1391V70.0846C60.6 70.3106 60.55 70.5264 60.54 70.7421H78.2C80.85 70.7421 83 68.5331 83 65.8104C83 59.4504 77.99 54.3029 71.8 54.3029Z"
            fill="#0346A5"
          />
        </svg>
      ),
      title: "Join community",
      description:
        "Become part of a community by joining and connecting with like-minded individuals who share common interests and goals.",
      out_number: (
        <svg
          width="149"
          height="96"
          viewBox="0 0 149 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.588 0.829443H47.675C51.1683 0.829443 54.0503 1.09145 56.321 1.61545C58.679 2.13945 60.6877 3.18745 62.347 4.75945C64.0937 6.33145 65.4037 8.12178 66.277 10.1304C67.2377 12.0518 67.98 15.0211 68.504 19.0384C69.29 25.0644 69.683 34.7148 69.683 47.9894V48.3824C69.683 68.3818 68.6787 80.7831 66.67 85.5864C64.6613 90.6518 61.7793 93.7084 58.024 94.7564C56.0153 95.2804 53.5263 95.5424 50.557 95.5424H37.588V83.0974H42.042C44.3127 83.0974 45.7537 82.7918 46.365 82.1804C47.0637 81.5691 47.413 80.6084 47.413 79.2984V17.0734C47.413 15.7634 47.0637 14.8028 46.365 14.1914C45.7537 13.5801 44.3127 13.2744 42.042 13.2744H37.588V0.829443ZM32.348 13.2744H27.894C25.6233 13.2744 24.1387 13.5801 23.44 14.1914C22.8287 14.8028 22.523 15.7634 22.523 17.0734V79.2984C22.523 80.6084 22.8287 81.5691 23.44 82.1804C24.1387 82.7918 25.6233 83.0974 27.894 83.0974H32.348V95.5424H19.379C12.829 95.5424 8.06933 93.5338 5.1 89.5164C2.65467 86.2851 1.17 78.8618 0.646 67.2464C0.384 62.7051 0.253 56.4171 0.253 48.3824V47.9894C0.253 27.4661 1.34467 14.8464 3.528 10.1304C4.48867 8.12178 5.79867 6.33145 7.458 4.75945C9.20467 3.18745 11.2133 2.13945 13.484 1.61545C15.842 1.09145 18.7677 0.829443 22.261 0.829443H32.348V13.2744ZM127.88 0.829443H139.015C142.595 0.829443 145.128 1.61544 146.613 3.18744C148.097 4.67211 148.84 7.29211 148.84 11.0474V35.0204C148.84 39.0378 147.792 42.0508 145.696 44.0594C147.879 45.9808 148.971 49.4304 148.971 54.4084V84.2764C148.971 89.1671 148.272 92.2674 146.875 93.5774C145.477 94.8874 142.464 95.5424 137.836 95.5424H128.011V57.5524C128.011 56.1551 127.792 55.1944 127.356 54.6704C127.006 54.0591 126.046 53.7534 124.474 53.7534H110.326V41.3084H120.02L124.343 41.1774C126.351 41.1774 127.487 40.7408 127.749 39.8674C127.836 39.6054 127.88 39.2124 127.88 38.6884V0.829443ZM122.771 13.2744H110.326C108.492 13.2744 107.356 13.5801 106.92 14.1914C106.483 14.7154 106.265 15.7198 106.265 17.2044V31.7454H91.8548C88.6234 31.7454 86.7021 31.4834 86.0908 30.9594C85.5668 30.4354 85.3048 28.8198 85.3048 26.1124V14.8464C85.3048 10.0431 86.0034 6.50612 87.4008 4.23545C88.8854 1.96478 92.0731 0.829443 96.9638 0.829443H122.771V13.2744ZM106.265 64.6264V79.1674C106.265 80.6521 106.483 81.7001 106.92 82.3114C107.356 82.8354 108.492 83.0974 110.326 83.0974H122.771V95.5424H96.9638C92.0731 95.5424 88.8854 94.4071 87.4008 92.1364C86.0034 89.8658 85.3048 86.3288 85.3048 81.5254V70.2594C85.3048 67.5521 85.5668 65.9364 86.0908 65.4124C86.7021 64.8884 88.6234 64.6264 91.8548 64.6264H106.265Z"
            fill="#F59F00"
          />
        </svg>
      ),
      out_image: box_3,
    },
  ];

  return (
    <div className="lg:px-[10%] md:px-5 px-3 py-20 flex flex-col gap-36">
      {data.map((item, index) => (
        <div
          key={index}
          className={`lg:flex md:flex justify-center items-center gap-10 ${
            index === 1 ? "flex-row-reverse" : ""
          } hover:scale-105 transition-all`}
        >
          <div className="mb-5">{item.out_number}</div>
          <div
            className={`lg:min-w-[980px] relative px-10 py-5 gap-10 bg-primary-color lg:min-h-[183px] ${
              index === 1 ? " flex-row-reverse text-right" : ""
            } rounded-3xl lg:flex justify-start items-center`}
          >
            <div
              className={`${
                index === 1
                  ? "-left-40 top-7 -scale-x-100 w-[420px]"
                  : index === 0
                  ? "-right-32 -top-40 w-[420px]"
                  : "-right-32 top-20 w-[320px]"
              } lg:absolute md:hidden lg:block hidden`}
            >
              <Image src={item.out_image} alt={item.out_image} />
            </div>
            <div>{item.svg}</div>
            <div className="lg:mt-0 md:mt-0 mt-5 flex flex-col gap-2">
              <h3 className="text-background-color">{item.title}</h3>
              <p className="text-background-color">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function User_base() {
  const data = [
    {
      title: "Business Professionals",
      description:
        "Make data-driven decisions effortlessly, without technical expertise.",
    },
    {
      title: "Data Enthusiasts",
      description:
        "Dive deeper into data with machine learning capabilities to uncover meaningful insights.",
    },
    {
      title: "Researchers and Academics",
      description:
        "Explore data with precision and efficiency for research and academic purposes.",
    },
  ];
  return (
    <div className="lg:flex md:block w-full block gap-20 justify-between items-center">
      <div className="flex flex-col gap-12 lg:w-1/2 md:w-full w-full">
        <h2 className="text-primary-color my-8">
          Empowering a Diverse User Base
        </h2>
        {data.map((item, index) => (
          <div
            key={index}
            className={`lg:w-1/2 md:w-2/3 w-full relative p-5 rounded-xl ${
              index === 1 && "text-right"
            } lg:w-1/2 md:w-full min-w-full bg-background-color border-2 border-primary-color`}
          >
            <h3
              className={`text-primary-color absolute ${
                index === 1 && "-top-5 right-5"
              } -top-5 bg-background-color px-5`}
            >
              {item.title}
            </h3>
            <p className={`text-description-color font-normal`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <Image
        src={userbase}
        alt="userbase"
        className="lg:w-1/2 md:lg-w-1/2 w-full mt-10"
      />
    </div>
  );
}

export function FeedBackCard() {
  const [swapper, setSwapper] = useState([
    <div
      key={index}
      className="bg-third-color transition-all hover:scale-105 -translate-x-1/2 -translate-y-1/4 border-3 rotate-6 absolute z-10 -top-14 border-background-color lg:w-[609px] md:w-[500px] h-[290px] rounded-xl"
    >
      <p className="text-xl">
        The predictive analytics feature has given us a competitive edge in the
        market. K-QuickSight is truly ahead of the curve.
      </p>
      <div className="flex gap-5 justify-start items-center">
        <Image
          src={jessi_profile}
          alt="jessi_profile.jpg"
          className="max-w-[78px] max-h-[78px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-2xl text-text-color font-semibold">Jessica sun</p>
          <p className="capitalize">Data scientist of google</p>
        </div>
      </div>
    </div>,

    <div
      key={index}
      className="bg-primary-color transition-all hover:scale-105 -translate-x-1/2 -translate-y-1/4  rotate-3 border-3 absolute z-10 -top-7 border-background-color lg:w-[609px] md:w-[500px] h-[290px] rounded-xl"
    >
      <p className="text-xl">
        The predictive analytics feature has given us a competitive edge in the
        market. K-QuickSight is truly ahead of the curve.
      </p>
      <div className="flex gap-5 justify-start items-center">
        <Image
          src={jessi_profile}
          alt="jessi_profile.jpg"
          className="max-w-[78px] max-h-[78px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-2xl text-text-color font-semibold">Jessica sun</p>
          <p className="capitalize">Data scientist of google</p>
        </div>
      </div>
    </div>,
    <div
      key={index}
      className="absolute hover:scale-105 transition-all top-0 -translate-x-1/2 -translate-y-1/4 z-10 lg:w-[609px] md:w-[500px] h-[290px] flex flex-col gap-10 rounded-xl bg-background-color p-5 border-3 border-primary-color"
    >
      <p className="text-xl">
        The predictive analytics feature has given us a competitive edge in the
        market. K-QuickSight is truly ahead of the curve.
      </p>
      <div className="flex gap-5 justify-start items-center">
        <Image
          src={jessi_profile}
          alt="jessi_profile.jpg"
          className="max-w-[78px] max-h-[78px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-2xl text-text-color font-semibold">Jessica sun</p>
          <p className="capitalize">Data scientist of google</p>
        </div>
      </div>
    </div>,
  ]);

  const [swapIndex, setSwapIndex] = useState(0);

  function handleSwap() {
    const nextIndex = (swapIndex + 1) % swapper.length;
    const newSwapper = [...swapper];

    // Swap the order
    const temp = newSwapper[swapIndex];
    newSwapper[swapIndex] = newSwapper[nextIndex];
    newSwapper[nextIndex] = temp;

    setSwapIndex(nextIndex);
    setSwapper(newSwapper);
  }

  return (
    <div className="relative mt-52">
      {swapper}
      <Button
        onClick={handleSwap}
        className="mt-60 bg-thirt-color text-background-color font-semibold"
      >
        Next user{" "}
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.846 13.2155L8.77652 8.05929C8.67871 7.9632 8.60069 7.84826 8.54701 7.72117C8.49334 7.59409 8.46509 7.4574 8.46391 7.31909C8.46272 7.18078 8.48864 7.04361 8.54013 6.91559C8.59162 6.78758 8.66767 6.67127 8.76383 6.57347C8.85999 6.47566 8.97433 6.39831 9.10019 6.34594C9.22606 6.29356 9.36091 6.26721 9.4969 6.26841C9.63288 6.26961 9.76727 6.29835 9.89221 6.35294C10.0172 6.40753 10.1302 6.48689 10.2246 6.58638L16.0181 12.4791C16.2101 12.6744 16.318 12.9393 16.318 13.2155C16.318 13.4918 16.2101 13.7567 16.0181 13.952L10.2246 19.8447C10.1302 19.9442 10.0172 20.0236 9.89221 20.0782C9.76727 20.1327 9.63288 20.1615 9.4969 20.1627C9.36091 20.1639 9.22606 20.1375 9.10019 20.0852C8.97433 20.0328 8.85999 19.9554 8.76383 19.8576C8.66767 19.7598 8.59162 19.6435 8.54013 19.5155C8.48864 19.3875 8.46272 19.2503 8.46391 19.112C8.46509 18.9737 8.49334 18.837 8.54701 18.7099C8.60069 18.5828 8.67871 18.4679 8.77652 18.3718L13.846 13.2155Z"
            fill="white"
          />
        </svg>
      </Button>
    </div>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export function SwapperTest() {
  return (
    <div className="w-full mt-20">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="w-1/3 rounded-xl min-h-[290px] cursor-pointer"
      >
        <SwiperSlide className="hover:scale-105 transition-all top-0 -translate-x-1/2 -translate-y-1/4 z-10 lg:w-[609px] md:w-[500px] h-[290px] flex flex-col gap-10 rounded-xl bg-background-color p-5 border-3 border-primary-color">
          <p className="text-xl">
            The predictive analytics feature has given us a competitive edge in
            the market. K-QuickSight is truly ahead of the curve.
          </p>
          <div className="flex gap-5 justify-start items-center mt-5">
            <Image
              src={jessi_profile}
              alt="jessi_profile.jpg"
              className="max-w-[78px] max-h-[78px] rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl text-text-color font-semibold">
                Jessica sun
              </p>
              <p className="capitalize">Data scientist of google</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="hover:scale-105 transition-all top-0 -translate-x-1/2 -translate-y-1/4 z-10 lg:w-[609px] md:w-[500px] h-[290px] flex flex-col gap-10 rounded-xl bg-primary-color text-background-color p-5 border-3 border-background-color">
          <p className="text-xl">
            The predictive analytics feature has given us a competitive edge in
            the market. K-QuickSight is truly ahead of the curve.
          </p>
          <div className="flex gap-5 justify-start items-center mt-5">
            <Image
              src={jessi_profile}
              alt="jessi_profile.jpg"
              className="max-w-[78px] max-h-[78px] rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl text-background-color font-semibold">
                Jessica sun
              </p>
              <p className="capitalize">Data scientist of google</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="hover:scale-105 transition-all top-0 -translate-x-1/2 -translate-y-1/4 z-10 lg:w-[609px] md:w-[500px] h-[290px] flex flex-col gap-10 rounded-xl bg-third-color text-background-color p-5 border-3 border-background-color">
          <p className="text-xl">
            The predictive analytics feature has given us a competitive edge in
            the market. K-QuickSight is truly ahead of the curve.
          </p>
          <div className="flex gap-5 justify-start items-center mt-5">
            <Image
              src={jessi_profile}
              alt="jessi_profile.jpg"
              className="max-w-[78px] max-h-[78px] rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl text-background-color font-semibold">
                Jessica sun
              </p>
              <p className="capitalize">Data scientist of google</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
