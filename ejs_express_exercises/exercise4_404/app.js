const express = require("express");
const app = express();

app.set("view engine","ejs");

app.use((req,res)=>{
  res.status(404).render("404");
});

app.listen(3000);
