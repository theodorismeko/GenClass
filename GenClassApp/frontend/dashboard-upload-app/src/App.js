import React from 'react';
import { Container, Typography, Paper, Snackbar, Button, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FileManagement from './components/FileManagement';
import GenClassForm from './components/GenClassForm';
import GenClassOutput from './components/GenClassOutput';
import GenclassHelp from './components/GenclassHelp';
import useFiles from './hooks/useFiles';
import useGenClass from './hooks/useGenClass';
import './App.css';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { files, loading, handleFileUpload, handleDeleteFile, snackbar, handleCloseSnackbar } = useFiles();
  const { genClassParams, genClassOutput, handleGenClassParamChange, runGenClass } = useGenClass();
  const [showHelp, setShowHelp] = React.useState(false);

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

        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowHelp(!showHelp)}
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </Button>
        </Box>
        {showHelp && <GenclassHelp />}
      </Paper>

      <Paper elevation={0} style={{ padding: '40px', marginBottom: '30px' }}>
        {genClassOutput && (
          <GenClassOutput output={genClassOutput} />
      )}
      </Paper>
    
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
