import { useState } from 'react';
import { runGenClass } from '../services/api';
import { parseGenClassOutput } from '../utils/parseGenClassOutput';

const useGenClass = () => {
  const [genClassParams, setGenClassParams] = useState({
    count: 500,
    fold_count: 0,
    gens: 200,
    threads: 16,
    srate: 0.10,
    mrate: 0.05,
    size: 100,
    train_file: '',
    test_file: '',
    output_method: 'csv',
    grammar: '',
    seed: null
  });

  const [genClassOutput, setGenClassOutput] = useState(null);

  const handleGenClassParamChange = (event) => {
    const { name, value } = event.target;
    setGenClassParams((prev) => ({
      ...prev,
      [name]: ['gens', 'count', 'threads', 'size', 'seed', 'fold_count'].includes(name) ? parseInt(value, 10) :
              ['srate', 'mrate'].includes(name) ? parseFloat(value) : value,
    }));
  };

  const runGenClassAlgorithm = async () => {
    try {
      const response = await runGenClass(genClassParams);
      console.log('API response:', response.data);
      if (response.data.output) {
        const parsedOutput = parseGenClassOutput(response.data.output);

        // Ensure fallback values for error rates
        parsedOutput.trainError = parsedOutput.trainError || 0;
        parsedOutput.classError = parsedOutput.classError || 0;

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
