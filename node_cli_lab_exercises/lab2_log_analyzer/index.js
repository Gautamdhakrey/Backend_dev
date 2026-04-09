const fs = require('fs');
const readline = require('readline');

const file = process.argv[2];

let errors = 0;
let lines = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(file),
});

rl.on('line', (line) => {
  lines++;
  if (line.toLowerCase().includes("error")) errors++;
});

rl.on('close', () => {
  console.log("Total lines:", lines);
  console.log("Error count:", errors);
});
