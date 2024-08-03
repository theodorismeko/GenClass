import React from 'react';
import { Typography, Grid } from '@mui/material';
import ErrorChart from './ErrorChart';
import ConfusionMatrixChart from './ConfusionMatrixChart';
import ClassPieChart from './ClassPieChart';

function GenClassOutput({ output }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>GenClass Output:</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Class Distribution:</Typography>
          <ClassPieChart classValue={output.classValue} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Error Rates:</Typography>
          <ErrorChart trainError={output.trainError} classError={output.classError} />
        </Grid>
        <Grid item xs={12}>
          <ConfusionMatrixChart data={output.confusionMatrix} />
        </Grid>
      </Grid>
    </>
  );
}

export default GenClassOutput;