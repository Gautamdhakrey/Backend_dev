const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/contact",(req,res)=>{
  res.render("form");
});

app.post("/contact",(req,res)=>{
  res.send(`Received: ${req.body.name}`);
});

app.listen(3000);
