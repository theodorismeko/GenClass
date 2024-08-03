import { useState, useEffect, useCallback } from 'react';
import { fetchFiles, uploadFile, deleteFile } from '../services/api';

function useFiles() {
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem('files');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const refreshFiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchFiles();
      setFiles(response.data);
      localStorage.setItem('files', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching files:', error);
      showSnackbar('Error fetching files', 'error');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (files.includes(file.name)) {
      showSnackbar('File already exists', 'warning');
      return;
    }

    setLoading(true);
    try {
      await uploadFile(file);
      await refreshFiles();
      showSnackbar('File uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading file:', error);
      showSnackbar('Error uploading file', 'error');
    }
    setLoading(false);
  };

  const handleDeleteFile = async (filename) => {
    setLoading(true);
    try {
      await deleteFile(filename);
      await refreshFiles();
      showSnackbar('File deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting file:', error);
      showSnackbar('Error deleting file', 'error');
    }
    setLoading(false);
  };

  return {
    files,
    loading,
    handleFileUpload,
    handleDeleteFile,
    snackbar,
    handleCloseSnackbar
  };
}

export default useFiles;