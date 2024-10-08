import React from 'react';
import { Typography, Grid } from '@mui/material';
import ErrorChart from './ErrorChart';
import ConfusionMatrixChart from './ConfusionMatrixChart';

function GenClassOutput({ output }) {
  return (
    <>
      <Typography variant="h6" align='justify'>GenClass Output</Typography>
      <Grid container spacing={2}> 
        <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" align='justify'>Confusion Matrix Values:</Typography>
          <ConfusionMatrixChart data={output.confusionMatrix}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle6" align='justify'>Error Rates:</Typography>
          <ErrorChart trainError={output.trainError} classError={output.classError} />
        </Grid>
       
      </Grid>
    </>
  );
}

export default GenClassOutput;