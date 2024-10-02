

function TodoList({ todos, toggleCompletion, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            />
            <span>{todo.title}</span>
          </label>
          <button onClick={() => deleteTodo(todo.id)}>Löschen</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
