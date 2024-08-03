import React from 'react';
import { Container, Typography, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FileManagement from './components/FileManagement';
import ExampleFiles from './components/ExampleFiles';
import GenClassForm from './components/GenClassForm';
import GenClassOutput from './components/GenClassOutput';
import useFiles from './hooks/useFiles';
import useExampleFiles from './hooks/useExampleFiles';
import useGenClass from './hooks/useGenClass';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { files, loading, handleFileUpload, handleDeleteFile, snackbar, handleCloseSnackbar } = useFiles();
  const { exampleFiles, handleUseExample } = useExampleFiles();
  const { genClassParams, genClassOutput, handleGenClassParamChange, runGenClass } = useGenClass();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
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
        <ExampleFiles
          exampleFiles={exampleFiles}
          onUseExample={handleUseExample}
        />
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <GenClassForm
          params={genClassParams}
          onChange={handleGenClassParamChange}
          onRun={runGenClass}
        />
      </Paper>

      {genClassOutput && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <GenClassOutput output={genClassOutput} />
        </Paper>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;