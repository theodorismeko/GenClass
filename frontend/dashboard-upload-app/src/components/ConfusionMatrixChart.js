import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

function ConfusionMatrixChart({ data }) {
  if (!data || data.length !== 4) return null;
  const [tp, fn, fp, tn] = data;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">Confusion Matrix</Typography>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{padding: '10px', textAlign: 'center'}}>
          <Typography>True Positive: {tp}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{padding: '10px', textAlign: 'center'}}>
          <Typography>False Negative: {fn}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{padding: '10px', textAlign: 'center'}}>
          <Typography>False Positive: {fp}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{padding: '10px', textAlign: 'center'}}>
          <Typography>True Negative: {tn}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ConfusionMatrixChart;