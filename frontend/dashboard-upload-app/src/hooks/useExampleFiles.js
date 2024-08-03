import { useState, useEffect } from 'react';
import { fetchExampleFiles } from '../services/api';

function useExampleFiles() {
  const [exampleFiles, setExampleFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetchExampleFiles();
        setExampleFiles(response.data.files || []);
      } catch (error) {
        console.error('Error fetching example files:', error);
        setExampleFiles([]);
      }
    };

    fetchFiles();
  }, []);

  const handleUseExample = (filename, type) => {
    // This function would be used to set the filename in the GenClass form
    console.log(`Using ${filename} as ${type} file`);
    // You might want to implement this functionality in the parent component
    // and pass it down as a prop
  };

  return { exampleFiles, handleUseExample };
}

export default useExampleFiles;