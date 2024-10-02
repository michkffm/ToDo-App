
import { useState } from 'react';

function TodoInput({ addTodo }) {
    const [inputValue, setInputValue] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault(); 
      if (inputValue.trim()) { 
        addTodo(inputValue.trim()); 
        setInputValue(''); 
      }
    };
  
    return (
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Neues Todo hinzufügen"
          required
        />
        <button type="submit">Hinzufügen</button>
      </form>
    );
  }
  
  export default TodoInput;