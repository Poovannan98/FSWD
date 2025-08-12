import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({ token, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = React.useCallback(async () => {
    const res = await axios.get('http://localhost:5000/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(res.data);
  }, [token]);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await axios.post('http://localhost:5000/todos', { text, completed: false }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos([...todos, res.data]);
    setText('');
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <h2>Your Todos</h2>
      <button onClick={onLogout}>Logout</button>
      <div className="todo-input">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo..." />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;