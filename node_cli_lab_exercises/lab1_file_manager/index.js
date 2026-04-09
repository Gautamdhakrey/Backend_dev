const fs = require('fs');
const path = require('path');

const [,, cmd, ...args] = process.argv;

switch(cmd) {
  case "read":
    console.log(fs.readFileSync(args[0], 'utf-8'));
    break;
  case "write":
    fs.writeFileSync(args[0], args[1]);
    console.log("File written");
    break;
  case "copy":
    fs.copyFileSync(args[0], args[1]);
    console.log("File copied");
    break;
  case "delete":
    fs.unlinkSync(args[0]);
    console.log("File deleted");
    break;
  case "list":
    console.log(fs.readdirSync(args[0] || '.'));
    break;
  default:
    console.log("Commands: read/write/copy/delete/list");
}
