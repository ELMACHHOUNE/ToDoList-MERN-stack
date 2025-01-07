import React from "react";

const Todos = ({ todo, setTodo, addTodo }) => {
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      addTodo(todo);
      setTodo(""); // Clear input
    }
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={handleChange}
        className="todo-input"
        value={todo}
      />
      <button className="add-btn" onClick={handleAdd}>
        Add Todo
      </button>
    </div>
  );
};

export default Todos;
