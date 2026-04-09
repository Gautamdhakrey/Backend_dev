const express = require("express");
const app = express();

app.use((req,res,next)=>{
  const start = Date.now();
  res.on("finish", ()=>{
    console.log(`${req.method} ${req.url} - ${Date.now()-start}ms`);
  });
  next();
});

app.get("/", (req,res)=>res.send("Hello"));

app.listen(3000);
