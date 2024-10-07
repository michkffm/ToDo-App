import express from 'express';
import cors from 'cors'; 

const app = express();

app.use(cors()); 
app.use(express.json()); 

let todos = [
  { id: 1, title: 'Einkaufen gehen', completed: false },
  { id: 2, title: 'Lernen', completed: true },
  { id: 3, title: 'Wäsche waschen', completed: false },
];


app.get('/api/todos', (req, res) => {
  res.status(200).json(todos); 
});


app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo); 
});


app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  
  if (todo) {
    todo.completed = !todo.completed; 
    res.status(200).json(todo); 
  } else {
    res.status(404).json({ message: 'Todo nicht gefunden' }); 
  }
});


app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1); 
    res.status(204).send(); 
  } else {
    res.status(404).json({ message: 'Todo nicht gefunden' }); 
  }
});


app.use((req, res) => {
  res.status(404).json({ message: 'Die angeforderte Ressource wurde nicht gefunden.' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Etwas ist schiefgelaufen.' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});