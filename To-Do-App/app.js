const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let todos = [
  { id: 1, text: "Learn Docker", done: false },
  { id: 2, text: "Deploy Capstone Project", done: false }
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add todo
app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

// Health check - for Monitoring
app.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));