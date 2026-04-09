const fs = require('fs');
const path = require('path');

const [,, src, dest] = process.argv;

function syncDirs(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);

  const files = fs.readdirSync(srcDir);

  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      syncDirs(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

try {
  syncDirs(src, dest);
  console.log("Sync completed");
} catch (err) {
  console.error("Error:", err.message);
}
