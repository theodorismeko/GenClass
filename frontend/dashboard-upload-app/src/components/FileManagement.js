import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function FileManagement({ files, loading, onFileUpload, onDeleteFile }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>File Management</Typography>
      <input
        accept=".train,.test"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={onFileUpload}
        disabled={loading}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" disabled={loading}>
          Upload File
        </Button>
      </label>
      {loading && <CircularProgress size={24} style={{ marginLeft: 15 }} />}
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file} />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => onDeleteFile(file)}
                disabled={loading}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default FileManagement;