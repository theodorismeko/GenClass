import { useState, useEffect, useCallback } from 'react';
import { fetchFiles, uploadFile, deleteFile } from '../services/api';  // Ensure this path is correct

function useFiles() {
  const [files, setFiles] = useState([]);
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
    } catch (error) {
      console.error('Error fetching files:', error);
      showSnackbar('Error fetching files', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const handleFileUpload = async (file, fileType) => {
    setLoading(true);
    try {
      await uploadFile(file, fileType);
      await refreshFiles();
      showSnackbar('File uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading file:', error);
      showSnackbar(error.response?.data?.detail || 'Error uploading file', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileType, fileId) => {
    setLoading(true);
    try {
      await deleteFile(fileType, fileId);
      await refreshFiles();
      showSnackbar('File deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting file:', error);
      showSnackbar('Error deleting file', 'error');
    } finally {
      setLoading(false);
    }
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