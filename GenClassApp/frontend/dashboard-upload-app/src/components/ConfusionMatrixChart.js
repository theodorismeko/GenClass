import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

function ConfusionMatrixChart({ data }) {
  if (!data || data.length !== 4) return null;
  const [tp, fn, fp, tn] = data;

  // Prepare data for the pie chart
  const pieData = [
    { id: 0, value: tp},
    { id: 1, value: fn},
    { id: 2, value: fp},
    { id: 3, value: tn},
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h6" align="center"></Typography>
        <PieChart
          series={[
            { data: pieData,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            }]}
          width={535}
          height={200}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" align="center"></Typography>
      </Grid>
      <Grid item xs={5}>
        <Paper elevation={4} style={{ padding: '8px', textAlign: 'center' }}>
          <Typography>True Positive: {tp}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper elevation={4} style={{ padding: '8px', textAlign: 'center' }}>
          <Typography>False Negative: {fn}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper elevation={4} style={{ padding: '8px', textAlign: 'center' }}>
          <Typography>False Positive: {fp}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper elevation={4} style={{ padding: '8px', textAlign: 'center' }}>
          <Typography>True Negative: {tn}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ConfusionMatrixChart;