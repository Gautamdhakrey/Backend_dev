const fs = require('fs');

const text = fs.readFileSync('input.txt', 'utf-8');
const wordCount = text.split(/\s+/).filter(Boolean).length;

fs.writeFileSync('output.txt', `Word count: ${wordCount}`);
console.log("Done!");
