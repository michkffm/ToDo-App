import { useState, useEffect } from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import TodoInput from './components/TodoInput';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/todos')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Netzwerkanfrage fehlgeschlagen: ' + response.statusText);
        }
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error('Fehler beim Abrufen der Todos:', error));
  }, []);

  const addTodo = (title) => {
    const newTodo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      {/* Verwendung der TodoInput-Komponente */}
      <TodoInput addTodo={addTodo} />
      {/* Verwendung der TodoList-Komponente */}
      <TodoList todos={todos} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;