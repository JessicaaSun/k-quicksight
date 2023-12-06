'use client'
import React, {useEffect, useState} from 'react';
import {generateBashURL} from "@/utils/util";
import {useSelector} from "react-redux";

const ImageVisualization = ({visualizationData, header}) => {
    console.log(visualizationData, header)
    if (!header) {
        return null; // or return a message or placeholder
    }

    return (
        <div>
            {Object.entries(visualizationData).map(([header, data]) => {
                const { histogram, boxplot, scatter, linechart} = data;
                return (
                    <div key={header} className={'flex flex-col gap-3'}>
                        <p className={'text-primary-color'}>Column {header}: </p>
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
                                linechart && (

                                   <a href={generateBashURL(linechart)} target={"_blank"}>
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       <img src={generateBashURL(linechart)} alt="line_chart" />
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
