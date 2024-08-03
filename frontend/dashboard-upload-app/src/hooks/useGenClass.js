import { useState } from 'react';
import { runGenClass } from '../services/api';
import { parseGenClassOutput } from '../utils/parseGenClassOutput';

function useGenClass() {
  const [genClassParams, setGenClassParams] = useState({
    train_path: '',
    test_path: '',
    generations: 100,
    output_format: 'csv'
  });
  const [genClassOutput, setGenClassOutput] = useState(null);

  const handleGenClassParamChange = (event) => {
    const { name, value } = event.target;
    setGenClassParams(prevParams => ({
      ...prevParams,
      [name]: name === 'generations' ? parseInt(value, 10) : value
    }));
  };

  const runGenClassAlgorithm = async () => {
    try {
      const response = await runGenClass(genClassParams);
      if (response.data.output) {
        const parsedOutput = parseGenClassOutput(response.data.output);
        setGenClassOutput(parsedOutput);
      } else if (response.data.error) {
        console.error(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error running GenClass:', error.response ? error.response.data : error.message);
    }
  };

  return {
    genClassParams,
    genClassOutput,
    handleGenClassParamChange,
    runGenClass: runGenClassAlgorithm
  };
}

export default useGenClass;