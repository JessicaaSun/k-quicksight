import React from 'react';
import AccordionFaqs from "@/app/faqs/AccordionFaqs";

const FaqsPage = () => {
    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between py-48">
                <div className={"text-center"}>
                    <h1 className={"text-primary-color "}>
                        Frequently Asked Questions
                    </h1>
                    <p className={"md:py-5"}>
                        Can’t find the answer you’re looking for? Reach out to our customer support team.
                    </p>
                </div>
                <div className={"md:w-3/4 md:py-16"}>
                    <AccordionFaqs/>
                </div>
            </main>
        </div>
    );
};

export default FaqsPage;