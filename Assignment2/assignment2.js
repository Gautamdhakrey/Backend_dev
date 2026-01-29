const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { Transform } = require('stream');

console.log("=== FILE SYSTEM ALL-IN-ONE DEMO ===");

/* -------------------------------------------------
   1. Reading Files (async, promise, sync, binary)
------------------------------------------------- */
fs.writeFileSync('example.txt', 'Hello Node.js File System Module');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (!err) console.log("Async Read:", data);
});

(async () => {
    const data = await fsPromises.readFile('example.txt', 'utf8');
    console.log("Promise Read:", data);
})();

const syncData = fs.readFileSync('example.txt', 'utf8');
console.log("Sync Read:", syncData);

fs.readFile('example.txt', (err, buffer) => {
    console.log("Binary Read Buffer Length:", buffer.length);
});

/* -------------------------------------------------
   2. Writing & Appending Files
------------------------------------------------- */
fs.writeFile('output.txt', 'Writing to file\n', () => {
    fs.appendFile('output.txt', 'Appending line\n', () => {
        console.log("Write & Append Done");
    });
});

fs.writeFileSync('sync.txt', 'Synchronous Write\n');

const jsonData = { name: "Gautam", course: "Node.js" };
fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

/* -------------------------------------------------
   3. Copying Files
------------------------------------------------- */
fs.copyFile('example.txt', 'copy.txt', () => {
    console.log("File Copied (async)");
});
fs.copyFileSync('example.txt', 'copy_sync.txt');

/* -------------------------------------------------
   4. Deleting Files Safely
------------------------------------------------- */
async function safeDelete(file) {
    try {
        await fsPromises.access(file);
        await fsPromises.unlink(file);
        console.log(file, "deleted");
    } catch {
        console.log(file, "does not exist");
    }
}
safeDelete('copy_sync.txt');

/* -------------------------------------------------
   5. Working with Directories
------------------------------------------------- */
fs.mkdirSync('demoDir', { recursive: true });
fs.writeFileSync('demoDir/file1.txt', 'Inside directory');

fs.readdir('demoDir', (err, files) => {
    console.log("Directory Contents:", files);
});

fs.stat('demoDir/file1.txt', (err, stats) => {
    console.log("File Size:", stats.size);
});

/* -------------------------------------------------
   6. Streams (read, write, pipe, transform)
------------------------------------------------- */
const readStream = fs.createReadStream('example.txt', { encoding: 'utf8' });
readStream.on('data', chunk => {
    console.log("Stream Read Chunk:", chunk);
});

const writeStream = fs.createWriteStream('stream_output.txt');
writeStream.write("Line 1\n");
writeStream.write("Line 2\n");
writeStream.end();

readStream.pipe(fs.createWriteStream('piped.txt'));

const upperCaseTransform = new Transform({
    transform(chunk, enc, cb) {
        this.push(chunk.toString().toUpperCase());
        cb();
    }
});

fs.createReadStream('example.txt')
    .pipe(upperCaseTransform)
    .pipe(fs.createWriteStream('upper.txt'));

/* -------------------------------------------------
   7. File Copy with Progress (Streams)
------------------------------------------------- */
function copyWithProgress(src, dest) {
    const totalSize = fs.statSync(src).size;
    let bytesRead = 0;

    const rs = fs.createReadStream(src);
    const ws = fs.createWriteStream(dest);

    rs.on('data', chunk => {
        bytesRead += chunk.length;
        const progress = ((bytesRead / totalSize) * 100).toFixed(2);
        console.log(`Copy Progress: ${progress}%`);
    });

    rs.pipe(ws);
}
copyWithProgress('example.txt', 'progress_copy.txt');

/* -------------------------------------------------
   8. Error Handling Demo
------------------------------------------------- */
fs.readFile('not_exist.txt', 'utf8', (err) => {
    if (err) {
        console.log("Handled Error Code:", err.code);
    }
});

async function fileExists(file) {
    try {
        await fsPromises.access(file);
        return true;
    } catch {
        return false;
    }
}

(async () => {
    console.log("Does example.txt exist?", await fileExists('example.txt'));
})();
