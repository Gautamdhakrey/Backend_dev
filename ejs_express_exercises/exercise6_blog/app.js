const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

let posts = [];

app.get("/",(req,res)=>res.render("index",{posts}));

app.get("/new",(req,res)=>res.render("new"));

app.post("/new",(req,res)=>{
  posts.push(req.body);
  res.redirect("/");
});

app.get("/post/:id",(req,res)=>{
  res.render("post",{post:posts[req.params.id]});
});

app.listen(3000);
