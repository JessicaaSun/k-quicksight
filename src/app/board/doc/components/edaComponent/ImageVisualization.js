'use client'
import React, {useEffect, useState} from 'react';
import {generateBashURL} from "@/utils/util";
import {useSelector} from "react-redux";

const ImageVisualization = ({visualizationData, header}) => {
    
    if (!header) {
        return null; // or return a message or placeholder
    }

    return (
        <div>
            {Object.entries(visualizationData).map(([header, data]) => {
                const { histogram, boxplot, scatter, line_chart} = data;
                return (
                    <div key={header} className={'flex flex-col gap-3'}>
                        <p className={'text-primary-color dark:text-white font-semibold my-5'}>Column {header}: </p>
                        <div className={'grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1'}>
                            {
                                histogram && (

                                    <a target={"_blank"} href={generateBashURL(histogram)} >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={generateBashURL(histogram)} alt="Histogram" />
                                    </a>
                                )
                            }
                            {
                                boxplot && (

                                    <a target={"_blank"} href={generateBashURL(boxplot)}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={generateBashURL(boxplot)} alt="boxplot" />
                                    </a>
                                )
                            }
                            {
                                scatter && (

                                    <a href={generateBashURL(scatter)} target={"_blank"}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={generateBashURL(scatter)} alt="scatter" />
                                    </a>
                                )
                            }
                            {
                                line_chart && (

                                   <a href={generateBashURL(line_chart)} target={"_blank"}>
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       <img src={generateBashURL(line_chart)} alt="line_chart" />
                                   </a>
                                )
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ImageVisualization;
