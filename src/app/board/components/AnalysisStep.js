"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'import dataset',
    'Exploratory data analysis',
    'Perform analysis',
    'Choosing model ',
    'Finishing'
];

export default function AnalysisStep({ step}) {
    return (
        <Box className={"w-full"}>
            <Stepper activeStep={step}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}