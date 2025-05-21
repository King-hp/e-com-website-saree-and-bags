const fs = require('fs');
const path = require('path');

// Directories where images are stored
const sareeDir = 'D:/websit for cloth/saree';
const bagDir = 'D:/websit for cloth/bag';

// Expected filenames based on our code
const expectedFiles = {
  saree: ['banarasi.jpg', 'kanjivaram.jpg', 'chiffon.jpg', 'cotton.jpg'],
  bag: ['leather-tote.jpg', 'clutch.jpg', 'canvas.jpg', 'potli.jpg']
};

// Function to rename files in a directory
async function renameFiles(directory, expectedNames, category) {
  try {
    // Check if directory exists
    if (!fs.existsSync(directory)) {
      console.error(`Directory ${directory} does not exist`);
      return;
    }

    // Get all files in the directory
    const files = fs.readdirSync(directory);
    
    console.log(`\n${category.toUpperCase()} IMAGES:`);
    console.log(`Found ${files.length} files in ${directory}`);
    
    if (files.length < expectedNames.length) {
      console.warn(`Warning: Found fewer files (${files.length}) than expected (${expectedNames.length})`);
    }

    // Rename files one by one
    for (let i = 0; i < Math.min(files.length, expectedNames.length); i++) {
      const oldPath = path.join(directory, files[i]);
      const newPath = path.join(directory, expectedNames[i]);
      
      // Don't rename if file already has the expected name
      if (files[i] === expectedNames[i]) {
        console.log(`✓ ${files[i]} already has the correct name`);
        continue;
      }
      
      // Check if destination file already exists
      if (fs.existsSync(newPath)) {
        console.log(`✗ Cannot rename ${files[i]} to ${expectedNames[i]} - destination file already exists`);
        continue;
      }
      
      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(`✓ Renamed: ${files[i]} → ${expectedNames[i]}`);
    }
  } catch (error) {
    console.error(`Error renaming files in ${directory}:`, error);
  }
}

// Main function
async function main() {
  console.log('STARTING IMAGE RENAMING PROCESS');
  console.log('===============================');
  
  // Rename saree images
  await renameFiles(sareeDir, expectedFiles.saree, 'saree');
  
  // Rename bag images
  await renameFiles(bagDir, expectedFiles.bag, 'bag');
  
  console.log('\nDONE! Image renaming process completed.');
  console.log('Please restart your server for changes to take effect.');
}

// Run the script
main(); 