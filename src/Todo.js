import React from 'react'
import './app.css'; 

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <div className="todo-item">
      <label>
        <input
          type='checkbox'
          checked={todo.complete}
          onChange={handleTodoClick}
          className="todo-checkbox" // Added class for styling
        />
        <span className={todo.complete ? 'completed' : ''}>{todo.name}</span>
      </label>
    </div>
  );
}
