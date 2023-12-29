// Import the necessary modules and components
import React from 'react';
import { generateBashURL } from '@/utils/util';
import { useSelector } from 'react-redux';
import Image from "next/image";

// Define the ImageVisualization component
const ImageVisualization = ({ visualizationData, header }) => {
    // Check if header is not provided
    if (!header) {
        return null; // or return a message or placeholder
    }

    // Return the JSX for rendering the component
    return (
        <div>
            <div className={'flex flex-col gap-3'}>
                <div className={'grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1'}>
                    {/* Render histogram if available */}
                    {visualizationData?.histogram && (
                        <a target={'_blank'} href={generateBashURL(visualizationData?.histogram)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={generateBashURL(visualizationData?.histogram)} alt="Histogram" />
                        </a>
                    )}
                    {/* Render boxplot if available */}
                    {visualizationData?.boxplot && (
                        <a target={'_blank'} href={generateBashURL(visualizationData?.boxplot)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={generateBashURL(visualizationData?.boxplot)} alt="boxplot" />
                        </a>
                    )}
                    {/* Render scatter plot if available */}
                    {visualizationData?.scatter && (
                        <a href={generateBashURL(visualizationData?.scatter)} target={'_blank'}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={generateBashURL(visualizationData?.scatter)} alt="scatter" />
                        </a>
                    )}
                    {/* Render line chart if available */}
                    {visualizationData?.line_chart && (
                        <a href={generateBashURL(visualizationData?.line_chart)} target={'_blank'}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={generateBashURL(visualizationData?.line_chart)} alt="line_chart" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// Export the ImageVisualization component
export default ImageVisualization;
