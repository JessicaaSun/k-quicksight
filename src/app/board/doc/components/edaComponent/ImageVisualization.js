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
                        <div className={'flex justify-start items-center flex-wrap'}>
                            {
                                histogram && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={generateBashURL(histogram)} alt="Histogram" className={'w-1/2'} />
                                )
                            }
                            {
                                boxplot && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={generateBashURL(boxplot)} alt="boxplot" className={'w-1/2'} />
                                )
                            }
                            {
                                scatter && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={generateBashURL(scatter)} alt="scatter" className={'w-1/2'} />
                                )
                            }
                            {
                                linechart && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={generateBashURL(linechart)} alt="line_chart" className={'w-1/2'} />
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
