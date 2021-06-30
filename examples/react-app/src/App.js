import React from 'react';
import './App.css';


function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <li
      key={index}
      className={`todo ${todo.isCompleted ? 'complete': ''}`}
    >
      <label for={index}>
        <input id={index} checked={todo.isCompleted} disabled={todo.isCompleted} type="checkbox" onClick={() => completeTodo(index)} />
        <span>{todo.text}</span>
      </label>
      <button onClick={() => removeTodo(index)}>x</button>
    </li>
  );
};


function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Todo..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React ⚛️",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch 🍔",
      isCompleted: false
    },
    {
      text: "Build really cool todo app with TypeScript 🚀",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const total = todos.length;
  const completed = todos.filter((t) => t.isCompleted).length;

  return (
    <div className="app">
      <div className="todo-list">
        <section className="task-input">
          <TodoForm addTodo={addTodo} />
          <p className="info">{total} total, {total - completed} pending, {completed} complete</p>
        </section>
        <ul className="tasks">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
