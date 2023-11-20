import React from 'react';
import Image from "next/image";
import AnalysisStep from "@/app/board/components/AnalysisStep";
import TableImage from "@assets/images/analysis/table.png"
import UploadData from "@assets/images/analysis/uploadData.png"
const AnalysisBoard = () => {
    return (
        <div>
            <div className={"flex flex-row py-10 w-full justify-between"}>
                <div className={"flex flex-col"}>
                    <h1 className={"text-primary-color"}>Analysis / Board</h1>
                    <div className={"flex flex-row gap-5"}>
                        <p className={"text-primary-color"}>
                            Predict future courses
                        </p>
                        <p className={""}>member</p>
                    </div>
                </div>
                <div className={"flex justify-end text-primary-color"}>
                    <AnalysisStep/>
                </div>
            </div>
            <div className={"flex flex-col justify-center items-center pt-28"}>
                <h2 className={"text-primary-color"}>Add data to start building an analysis</h2>
                <div className={"flex flex-row pt-10 gap-10"}>
                    <div className={"flex flex-col"}>
                        <Image src={UploadData} alt={""} className={"w-40  border-solid border-2 bg-cyan-500 shadow-lg"}/>
                        <p>Upload new dataset</p>
                    </div>
                    <div className={"flex flex-col"}>
                        <Image src={TableImage} alt={""} className={"w-40 "}/>
                        <p>Pick existing dataset</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisBoard;