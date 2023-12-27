import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImportExistDataset from "@/app/board/doc/components/ImportExistDataset";
import CleaningStep from "@/app/board/doc/components/CleaningStep";
import Eda from "@/app/board/doc/components/Eda";
import Analysis from "@/app/board/doc/components/Analysis";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Visualization from "@/app/board/doc/components/Visualization";

const steps = [
    {
        label: 'Import dataset or Load dataset',
        description: <ImportExistDataset />,
    },
    {
        label: 'Cleaning dataset',
        description: <CleaningStep />,
    },
    {
        label: 'Exploratory data analysis',
        description: <Eda />,
    },
    {
        label: 'Analysis',
        description: <Analysis />,
    },

];

export default function StepperProcess() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel >
                           <span className={'dark:text-white'}> {step.label}</span>
                        </StepLabel>
                        <StepContent>
                            <Typography className={'dark:text-white'}>{step.description}</Typography>
                            <Box sx={{ mb: 2, mt: 4 }}>
                                <div className='flex justify-between items-center'>
                                    <Button
                                        className='flex gap-3 dark:text-white rounded-xl bg-third-color text-white px-3 hover:bg-third-color/50'
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        <FaArrowLeft /> Back 
                                    </Button>
                                    <Button
                                        className='flex gap-3 dark:text-white rounded-xl bg-primary-color text-white px-3 hover:bg-primary-color/50'
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'} <FaArrowRight />
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
