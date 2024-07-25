import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper, { stepperClasses } from '@mui/material/Stepper';
import Step, { stepClasses } from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepContent, StepIcon, useTheme } from '@mui/material';

export default function HorizontalWorkflow({steps=["New"], activeState=0, nextAction, backAction}) {
  const [activeStep, setActiveStep] = React.useState(activeState);

  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.light;

  const handleNext = () => {
    nextAction();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    backAction();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' , paddingTop:"24px", paddingInlineEnd:"20px"}}>
      <div style={{ display: "flex", flexDirection:"row", alignItems:"baseline"}}>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop:"5px"}}>
            <div>
                <Button onClick={handleNext} sx={{fontSize: 12, fontWeight:"bold", backgroundColor:primaryLightColor}}>
                {activeStep === steps.length - 1 ? 'Finish' : steps[activeStep+1]}
                </Button>

                <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 , fontSize: 12, color:"gray"}}>Back</Button>
            </div>
          </Box>
        </React.Fragment>
      )}
      <Stepper activeStep={activeStep} 
      style={{paddingInlineStart:"20px",
      }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} style={{display:"flex", flexDirection:"column", justifyContent:"center"}} sx={{color:"gray"}}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </div>
    </Box>
  );
}
