import React from 'react';
import UploadNewData from "@/app/board/analysis/components/UploadNewData";
import FileDetail from '@/app/board/dataset/component/FileDetail';
import HorizontalLinearAlternativeLabelStepper from '../../components/NewVersion/Stepper';
import { Button } from '@nextui-org/react';
import PerformAnalysisButton from '../../components/NewVersion/PerformAnalysis';



const NewAnalysis = ({ params }) => {
    const { uuid } = params;

    return (
        <div className='grid gap-5 mt-5 w-full p-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-primary-color uppercase'>Analysis</h2>
                    <p className='text-description-color'>Pre-analysis</p>
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <PerformAnalysisButton uuid={uuid} />
            </div>
            <FileDetail uuid={uuid} />
        </div>
    );
};

export default NewAnalysis;