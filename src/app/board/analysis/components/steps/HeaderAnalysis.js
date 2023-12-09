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
            
        </div>
    );
};

export default HeaderAnalysis;