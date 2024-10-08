export function parseGenClassOutput(output) {
  console.log('Raw output:', output);  // Debug: log the raw output

  const lines = output.split('\n');
  const classLine = lines.find(line => line.startsWith('CLASS='));
  const trainErrorLine = lines.find(line => line.startsWith('TRAIN ERROR'));
  const classErrorLine = lines.find(line => line.startsWith('CLASS ERROR'));
  const confusionMatrixLines = lines.filter(line => /^\s*\d+\s+\d+\s*$/.test(line));

  const classValue = classLine ? parseFloat(classLine.split('=')[1]) : 0;
  const trainError = trainErrorLine ? parseFloat(trainErrorLine.split('=')[1]) : 0;
  const classError = classErrorLine ? parseFloat(classErrorLine.split('=')[1]) : 0;

  let confusionMatrix = null;
  if (confusionMatrixLines.length === 2) {
    confusionMatrix = confusionMatrixLines
    .map(line => line.trim().split(/\s+/).map(Number))
    .flat();
    
  } else {
      console.warn('Unexpected confusion matrix format or insufficient lines.');
  }


  return { classValue, trainError, classError, confusionMatrix };
}
