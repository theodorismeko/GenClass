import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

function GenClassForm({ params, onChange, onRun }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>Run GenClass</Typography>
      <TextField
        label="Train Path"
        name="train_path"
        value={params.train_path}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Test Path"
        name="test_path"
        value={params.test_path}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Generations"
        name="generations"
        type="number"
        value={params.generations}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={onRun}>
        Run GenClass
      </Button>
    </>
  );
}

export default GenClassForm;