import React from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

function GenClassForm({ params, onChange, onRun, files }) {
  const getFilesByType = (type) => {
    return files.filter(file => {
      if (typeof file === 'string') {
        return file.endsWith(`.${type}`);
      } else if (file && typeof file === 'object' && file.filename) {
        return file.filename.endsWith(`.${type}`);
      }
      return false;
    });
  };

  const renderFileOption = (file) => {
    const value = typeof file === 'string' ? file : file.filename;
    return (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    );
  };

  const handleFileChange = (event) => {
    const { name, value } = event.target;
    onChange({
      target: {
        name,
        value: value === 'none' ? '' : value
      }
    });
  };

  const renderFileSelect = (label, name, fileType) => (
    <TextField
      fullWidth
      select
      label={label}
      name={name}
      value={params[name] || ''}
      onChange={handleFileChange}
    >
      <MenuItem value="none">None</MenuItem>
      {getFilesByType(fileType).map(renderFileOption)}
    </TextField>
  );


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {renderFileSelect("Train File", "train_file", "train")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderFileSelect("Test File", "test_file", "test")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderFileSelect("Input Grammar", "grammar", "bnf")}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Chromosomes"
          name="count"
          type="number"
          value={params.count}
          inputProps={{ step: 1, min: 0}}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Maximum Generations"
          name="gens"
          type="number"
          value={params.gens}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Selection Rate"
          name="srate"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 1 }}
          value={params.srate}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Mutation Rate"
          name="mrate"
          type="number"
          inputProps={{ step: 0.01, min: 0, max: 1 }}
          value={params.mrate}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Chromosome Size"
          name="size"
          type="number"
          value={params.size}
          inputProps={{ step: 1, min: 0}}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Random Seed"
          name="seed"
          type="number"
          value={params.seed || ''}
          inputProps={{ step: 1, min: 0}}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Threads for OpenMP"
          name="threads"
          type="number"
          value={params.threads || ''}
          inputProps={{ step: 1, min: 0, max: 16 }}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          select
          label="Output Method"
          name="output_method"
          value={params.output_method}
          onChange={onChange}
        >
          <MenuItem value="simple">Simple</MenuItem>
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="full">Full</MenuItem>
        </TextField>
      </Grid>
      
      <Grid item xs={12}>
        <Button  variant="contained" color="primary" onClick={onRun}>
          Run GenClass
        </Button>
      </Grid>
    </Grid>
  );
};

export default GenClassForm;
