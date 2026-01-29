const fs = require('fs');
const os = require('os');
const http = require('http');
const url = require('url');

console.log("=== Node.js Combined Practical File ===");

/* ---------------------------------------------------
   TASK 1: File Operations (Read file, count words)
--------------------------------------------------- */
function fileWordCounter() {
    const inputFile = 'sample.txt';
    const outputFile = 'wordcount.txt';

    fs.writeFileSync(inputFile, "Node.js is powerful and easy to learn.");

    const data = fs.readFileSync(inputFile, 'utf8');
    const wordCount = data.split(/\s+/).length;

    fs.writeFileSync(outputFile, `Word Count: ${wordCount}`);
    console.log("Task1: Word count written to wordcount.txt");
}

fileWordCounter();


/* ---------------------------------------------------
   TASK 2: Custom String Utils (capitalize, reverse, vowels)
--------------------------------------------------- */
const stringUtils = {
    capitalize: (str) => str.toUpperCase(),
    reverse: (str) => str.split('').reverse().join(''),
    countVowels: (str) => (str.match(/[aeiou]/gi) || []).length
};

console.log("Task2:");
console.log(stringUtils.capitalize("nodejs"));
console.log(stringUtils.reverse("nodejs"));
console.log("Vowels:", stringUtils.countVowels("nodejs"));


/* ---------------------------------------------------
   TASK 3: System Information Logger (every 5 seconds)
--------------------------------------------------- */
function logSystemInfo() {
    const info = `
Time: ${new Date().toLocaleTimeString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Free Memory: ${(os.freemem() / (1024**3)).toFixed(2)} GB
---------------------------\n`;

    fs.appendFile('system_log.txt', info, () => {});
}

setInterval(logSystemInfo, 5000);
console.log("Task3: System logger started (writes every 5s)");



/* ---------------------------------------------------
   TASK 4: Simple TODO API (CRUD in memory)
--------------------------------------------------- */
let todos = [];
let idCounter = 1;


/* ---------------------------------------------------
   TASK 5: Event Loop Demo
--------------------------------------------------- */
console.log("Task5: Event Loop Demo Start");

setTimeout(() => console.log("setTimeout"), 0);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick"));

Promise.resolve().then(() => console.log("Promise"));

console.log("Event Loop Demo End");


/* ---------------------------------------------------
   HTTP SERVER FOR TODO API
--------------------------------------------------- */
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');

    // GET all todos
    if (path === '/todos' && method === 'GET') {
        res.end(JSON.stringify(todos));
    }

    // POST new todo
    else if (path === '/todos' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const todo = JSON.parse(body);
            todo.id = idCounter++;
            todos.push(todo);
            res.end(JSON.stringify(todo));
        });
    }

    // DELETE todo
    else if (path.match(/\/todos\/\d+/) && method === 'DELETE') {
        const id = parseInt(path.split('/')[2]);
        todos = todos.filter(t => t.id !== id);
        res.end(JSON.stringify({ message: "Deleted" }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Task4: TODO API running at http://localhost:3000");
});
