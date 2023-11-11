"use client"
import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

const AccordionFaqs = () => {
    const mediumTitleStyle = {
        fontWeight: 500, // Medium font weight
    };    return (
        <Accordion className={"text-text-color"}>
            <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="How do I get started with K-QuickSight?"
                titleStyle={mediumTitleStyle}
            >
                <p>
                    Getting started with K-QuickSight is simple. Visit our website and sign up for an account.
                    Once registered, you&apos;ll have access to our intuitive platform, and you can begin connecting your data sources for analysis.
                </p>
            </AccordionItem>
            <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="What data sources can I connect to with K-QuickSight?">
                <p>
                    K-QuickSight is designed to be versatile. You can effortlessly connect to various data sources, including CSV, text, XLSX, JSON files.
                    Our platform ensures convenient access to your valuable information, regardless of the file format.
                </p>
            </AccordionItem>
            <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Is there a free trial for K-QuickSight?">
                <p>
                    Yes, it is free for you to explore the features and capabilities of K-QuickSight. Take advantage of this trial to experience seamless data analysis and see how our platform can benefit your needs.
                </p>
            </AccordionItem>
            <AccordionItem
                className={"font-normal"}
                key="4"
                aria-label="Accordion 4"
                title="What is K-QuickSight ML Insights, and how can I use it?">
                <p>
                    K-QuickSight ML Insights is a feature that unlocks deeper insights and provides a competitive edge through built-in machine learning libraries. To use it, just go to analysis page, upload your dataset and choose a supervised machine learning model to use for your analysis.
                </p>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionFaqs;
