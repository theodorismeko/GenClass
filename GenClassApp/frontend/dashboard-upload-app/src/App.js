import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Container, Typography, Paper, Snackbar, Button, Box, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FileManagement from './components/FileManagement';
import GenClassForm from './components/GenClassForm';
import useFiles from './hooks/useFiles';
import useGenClass from './hooks/useGenClass';
import './App.css';

const GenClassOutput = lazy(() => import('./components/GenClassOutput'));
const GenclassHelp = lazy(() => import('./components/GenclassHelp'));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { files, loading, handleFileUpload, handleDeleteFile, snackbar, handleCloseSnackbar } = useFiles();
  const { genClassParams, genClassOutput, handleGenClassParamChange, runGenClass } = useGenClass();
  const [showHelp, setShowHelp] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <CircularProgress />;
  }

  // Function to safely convert snackbar message to string
  const getSnackbarMessage = (message) => {
    if (typeof message === 'string') {
      return message;
    }
    if (typeof message === 'object' && message !== null) {
      return JSON.stringify(message);
    }
    return 'An error occurred';
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align='center' p="20px" marginBottom='20px' className='main-header'>
        GenClass Dashboard
      </Typography>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <FileManagement
          files={files}
          loading={loading}
          onFileUpload={handleFileUpload}
          onDeleteFile={handleDeleteFile}
        />
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <GenClassForm 
          params={genClassParams}
          onChange={handleGenClassParamChange}
          onRun={runGenClass}
          files={files}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowHelp(!showHelp)}
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </Button>
        </Box>
        <Suspense fallback={<CircularProgress />}>
          {showHelp && <GenclassHelp />}
        </Suspense>
      </Paper>

      <Paper elevation={0} style={{ padding: '40px', marginBottom: '30px' }}>
        <Suspense fallback={<CircularProgress />}>
          {genClassOutput && <GenClassOutput output={genClassOutput} />}
        </Suspense>
      </Paper>
    
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {getSnackbarMessage(snackbar.message)}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;