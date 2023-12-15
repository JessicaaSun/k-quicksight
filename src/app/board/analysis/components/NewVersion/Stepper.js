import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Import dataset',
    'perform analysis',
    'Create an ad',
];

export default function HorizontalLinearAlternativeLabelStepper({activeSteps}) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeSteps} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}