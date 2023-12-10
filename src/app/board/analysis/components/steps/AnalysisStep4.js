import React from 'react';
import Image from "next/image";
import SummeryReport from "@assets/images/analysis/summeryReport.png";
const AnalysisStep4 = () => {
    return (
        <div className={"px-5 py-10"}>
            <Image src={SummeryReport} alt={"SummeryReport"}/>
        </div>
    );
};

export default AnalysisStep4;