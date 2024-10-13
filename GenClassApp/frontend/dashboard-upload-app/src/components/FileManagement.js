import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function FileManagement({ files, loading, onFileUpload, onDeleteFile }) {
  const fileTypes = [
    { type: 'train', accept: '.train', fieldName: 'train_file' },
    { type: 'test', accept: '.test', fieldName: 'test_file' },
    { type: 'grammar', accept: '.bnf', fieldName: 'grammar' }
  ];

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file, fieldName);
    }
  };

  const renderFileInfo = (file) => {
    const primary = file.filename || 'Unnamed file';
    const secondary = `Type: ${file.type || 'Unknown'}`;
    return { primary, secondary };
  };

  return (
    <>
      <Typography variant="h6" align='justify' p="8px" marginBottom='8px'>File Management</Typography>
      <Grid container spacing={2}>
        {fileTypes.map(({ type, accept, fieldName }) => (
          <Grid item xs={12} sm={4} key={type}>
            <input
              accept={accept}
              style={{ display: 'none' }}
              id={`${type}-file-upload`}
              type="file"
              onChange={(e) => handleFileUpload(e, fieldName)}
              disabled={loading}
            />
            <label htmlFor={`${type}-file-upload`}>
              <Button variant="contained" component="span" disabled={loading} fullWidth>
                Upload {type.charAt(0).toUpperCase() + type.slice(1)} File
              </Button>
            </label>
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress size={24} style={{ margin: '15px auto', display: 'block' }} />}
      <List>
        {files.map((file) => {
          const { primary, secondary } = renderFileInfo(file);
          return (
            <ListItem key={file.id}>
              <ListItemText primary={primary} secondary={secondary} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteFile(file.type, file.id)}
                  disabled={loading}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default FileManagement;