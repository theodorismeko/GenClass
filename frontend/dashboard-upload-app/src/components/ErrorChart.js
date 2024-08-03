import React from 'react';
import { BarChart } from '@mui/x-charts';

function ErrorChart({ trainError, classError }) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Train Error', 'Class Error'] }]}
      series={[{ data: [trainError, classError] }]}
      width={400}
      height={300}
    />
  );
}

export default ErrorChart;