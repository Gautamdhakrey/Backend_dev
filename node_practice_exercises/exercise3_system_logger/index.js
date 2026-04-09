const fs = require('fs');
const os = require('os');

setInterval(() => {
  const log = `
Time: ${new Date().toISOString()}
CPU: ${os.cpus().length}
Memory: ${os.freemem()}
Platform: ${os.platform()}
-------------------
`;
  fs.appendFileSync('system.log', log);
  console.log("Logged...");
}, 5000);
