const express = require('express');
const app = express();

app.use(express.json());

let todos = [];

// Create
app.post('/todos', (req,res)=>{
  todos.push(req.body);
  res.json(todos);
});

// Read
app.get('/todos', (req,res)=> res.json(todos));

// Update
app.put('/todos/:id', (req,res)=>{
  todos[req.params.id] = req.body;
  res.json(todos);
});

// Delete
app.delete('/todos/:id', (req,res)=>{
  todos.splice(req.params.id,1);
  res.json(todos);
});

app.listen(3000);
