import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ErrorChart from './ErrorChart';
import ConfusionMatrixChart from './ConfusionMatrixChart';

function GenClassOutput({ output }) {
  if (!output || typeof output !== 'object') {
    return <Typography color="error">Invalid output data</Typography>;
  }

  const { confusionMatrix, trainError, classError } = output;

  const isValidConfusionMatrix = Array.isArray(confusionMatrix) && confusionMatrix.length === 4;
  const isValidErrorRates = typeof trainError === 'number' && typeof classError === 'number';

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" align='justify' gutterBottom>GenClass Output</Typography>
      <Grid container spacing={4}> 
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" align='justify' gutterBottom>Confusion Matrix Values:</Typography>
          {isValidConfusionMatrix ? (
            <ConfusionMatrixChart data={confusionMatrix} />
          ) : (
            <Typography color="error">Invalid confusion matrix data</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" align='justify' gutterBottom>Error Rates:</Typography>
          {isValidErrorRates ? (
            <ErrorChart trainError={trainError} classError={classError} />
          ) : (
            <Typography color="error">Invalid error rate data</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenClassOutput;