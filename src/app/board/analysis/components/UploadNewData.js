"use client"
import React, {useState} from 'react';
import AnalysisStep from "@/app/board/components/AnalysisStep";
import ShareMember from "@/app/board/dataset/component/shareMember";
import UploadDataSet from "@/app/board/analysis/components/UploadDataSet";
import ExistingDataset from "@/app/board/analysis/components/ExistingDataset";
const NewData = () => {

    return (
        <div>
            <div className={"flex flex-row pt-10 w-full justify-between"}>
                <div className={"flex flex-col"}>
                    <h1 className={"text-primary-color pb-5"}>Analysis / Board</h1>
                    <div className={"flex flex-row gap-5"}>
                        <p className={"text-primary-color"}>
                            Predict future courses
                        </p>
                        <ShareMember/>
                    </div>
                </div>
                <div className={"flex justify-end text-primary-color"}>
                    <AnalysisStep step={0}/>
                </div>
            </div>
            <div className={"flex flex-col justify-center items-center pt-16"}>
                <h2 className={"text-primary-color"}>Add data to start building an analysis</h2>
                <div className={"flex flex-row pt-10 gap-10"}>
                    <UploadDataSet/>
                    <ExistingDataset/>
                </div>
            </div>
        </div>
    );
};

export default NewData;