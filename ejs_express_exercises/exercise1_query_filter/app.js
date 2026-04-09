const express = require("express");
const app = express();

const users = [{name:"Abhi"}, {name:"John"}];

app.get("/users", (req,res)=>{
  const name = req.query.name;
  const result = name ? users.filter(u=>u.name===name) : users;
  res.json(result);
});

app.listen(3000);
