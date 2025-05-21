const { exec } = require('child_process');
const path = require('path');

// Get the path to the next binary in node_modules
const nextBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'next');

console.log('Starting Next.js development server...');
console.log(`Next.js binary path: ${nextBinPath}`);

// Execute the next dev command
const nextProcess = exec(`"${nextBinPath}" dev`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// Log output from the process
nextProcess.stdout.on('data', (data) => {
  console.log(data);
});

nextProcess.stderr.on('data', (data) => {
  console.error(data);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
}); 