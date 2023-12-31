import React from "react";
import Image from "next/image";
import boxEmpty from "@assets/images/analysis/box-empty.png";
const EmptyAnalysis = ({ isAnalysis, isSearchNotFound }) => {
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <Image src={boxEmpty} unoptimized={true} alt={""} className={"w-96 "} />
      <p
        className={
          "text-primary-color dark:text-third-color font-semibold text-2xl"
        }
      >
        {isSearchNotFound
          ? isAnalysis
            ? "No analysis found."
            : "No dashboard found."
          : isAnalysis
          ? `You don't have any analysis, please click on "Create Analysis" button.`
          : `You don't have any visualization dashboard, please click on "Create Dashboard" button.`}
      </p>
    </div>
  );
};

export default EmptyAnalysis;
