"use client"
import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

const AccordionFaqs = () => {
    return (
        <Accordion>
            <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="How do I get started with K-QuickSight?">
                <p>
                </p>
            </AccordionItem>
            <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="What data sources can I connect to with K-QuickSight?">
                <p>

                </p>
            </AccordionItem>
            <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Is there a free trial for K-QuickSight?">
                <p>

                </p>
            </AccordionItem>
            <AccordionItem
                key="4"
                aria-label="Accordion 4"
                title="What is K-QuickSight ML Insights, and how can I use it?">
                <p>

                </p>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionFaqs;
