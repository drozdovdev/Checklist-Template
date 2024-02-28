import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './app.css'; 

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
      const name = todoNameRef.current.value
      if (name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <div className="container">
      <h1 class="checklist">Checklist</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="input-container">
        <input ref={todoNameRef} type="text" onKeyDown={handleKeyDown} />
        <button className="button" onClick={handleAddTodo}>
          Add 
        </button>
      </div>
      <div className="buttons-container">
        <button className="clear-button" onClick={handleClearTodos}>
          Clear
        </button>
      </div>
      <div className="todo-count">
        {todos.filter((todo) => !todo.complete).length} left to do
      </div>
    </div>
  );  
}

export default App;
