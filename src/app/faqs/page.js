import React from "react";
import AccordionFaqs from "@/app/faqs/AccordionFaqs";

const FaqsPage = () => {
  return (
    <div>
      <main className="flex md:mx-0 mx-5 flex-col items-center justify-between md:pt-48 max-sm:pt-52 sm:pt-52 lg:pb-10 md:pb-7 max-sm:pb-5 sm:pb-0 ">
        <div className={"text-center "}>
          <h1
            className={
              "text-primary-color dark:text-third-color md:w-full md:text-4xl text-2xl"
            }
          >
            Frequently Asked Questions
          </h1>
          <p className={"md:py-5 dark:text-white py-3"}>
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            support team.
          </p>
        </div>
        <div className={"md:w-3/4 md:py-10 text-color"}>
          <AccordionFaqs />
        </div>
      </main>
    </div>
  );
};

export default FaqsPage;
