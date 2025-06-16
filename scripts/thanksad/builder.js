const fs = require('fs-extra');
const path = require('path');

const sourceDir = 'src/thanksad';
const destinationDir = 'public/thanksad';

async function copyJsonFiles() {
  try {
    if (fs.existsSync(destinationDir)) {
      await fs.remove(destinationDir);
    }
    
    await fs.ensureDir(destinationDir)
    await fs.copy(sourceDir, destinationDir, { overwrite: true });
  } catch (err) {
    console.error('An error occurred while copying JSON files:', err);
    process.exit(1);
  }
}

copyJsonFiles();