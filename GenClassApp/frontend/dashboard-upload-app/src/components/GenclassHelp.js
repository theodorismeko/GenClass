import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { getGenclassHelp } from '../services/api';

const GenclassHelp = () => {
  const [help, setHelp] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const response = await getGenclassHelp();
        setHelp(response.data.help);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch help');
      }
    };

    fetchHelp();
  }, []);

  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!help) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Genclass Help</Typography>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', padding: '20px', marginBottom: '20px' }}>{help}</pre>
    </div>
  );
};

export default GenclassHelp;
