import React from 'react';
import { PieChart } from '@mui/x-charts';

function ClassPieChart({ classValue }) {
  const data = [
    { id: 0, value: classValue, label: 'Class 0' },
    { id: 1, value: 1 - classValue, label: 'Class 1' },
  ];

  return (
    <PieChart
      series={[{ data }]}
      width={400}
      height={200}
    />
  );
}

export default ClassPieChart;