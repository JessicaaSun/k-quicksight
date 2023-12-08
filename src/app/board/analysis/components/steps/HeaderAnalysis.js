import React, {useState} from 'react';
import ShareMember from "@/app/board/dataset/component/shareMember";

const HeaderAnalysis = ({filename}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleSelect = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        }else if(currentStep === 3){
            setCurrentStep(4)
        }
    };
    return (
        <div>
            <div className={"flex flex-col px-10"}>
                <div className={"flex flex-row"}>
                    <h1 className={"text-primary-color pb-5"}>Analysis</h1>
                    {currentStep !== 3 && (
                        <h1 className={"text-primary-color pb-5"}>/Data</h1>
                    )}
                </div>
                <div className={"flex flex-row gap-5"}>
                    {currentStep !== 3 && (
                        <p className={"text-primary-color font-medium"}>{filename || 'Analysis'}</p>
                    )}
                    {currentStep === 3 && (
                        <p className={"text-primary-color text-xl"}>Income</p>
                    )}
                    <ShareMember />
                </div>
            </div>
        </div>
    );
};

export default HeaderAnalysis;