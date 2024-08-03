import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function ExampleFiles({ exampleFiles, onUseExample }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>Example Files</Typography>
      {exampleFiles && exampleFiles.length > 0 ? (
        <List>
          {exampleFiles.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file} />
              <Button onClick={() => onUseExample(file, 'train')}>
                Use as Train
              </Button>
              <Button onClick={() => onUseExample(file, 'test')}>
                Use as Test
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No example files available.</Typography>
      )}
    </>
  );
}

export default ExampleFiles;