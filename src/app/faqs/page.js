import React from 'react';
import AccordionFaqs from "@/app/faqs/AccordionFaqs";

const FaqsPage = () => {
    return (
        <div>
            <main className="flex md:mx-0 mx-5 flex-col items-center justify-between pt-48 pb-28 ">
                <div className={"text-center "}>
                    <h1 className={"text-primary-color md:w-full md:text-4xl text-2xl"}>
                        Frequently Asked Questions
                    </h1>
                    <p className={"md:py-5 py-3"}>
                        Can’t find the answer you’re looking for? Reach out to our customer support team.
                    </p>
                </div>
                <div className={"md:w-3/4 md:py-10 text-color"}>
                    <AccordionFaqs/>
                </div>
            </main>
        </div>
    );
};

export default FaqsPage;