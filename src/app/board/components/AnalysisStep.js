import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'import dataset',
    'Perform analysis',
    'Choosing model ',
    'Finishing'
];

export default function HorizontalLinearAlternativeLabelStepper() {
    return (
        <Box className={"w-full"}>
            <Stepper alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}