import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: text.trim(), completed: false },
    ]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    return filter === "completed" ? todo.completed : !todo.completed;
  });

  return (
    <div className="App">
      <h2>📝 Todo List</h2>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <div className="filters">
        {["all", "active", "completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;