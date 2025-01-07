import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const DisplayTodos = ({ todos, removeTodo, completeTodo, updateTodo }) => {
  const [sort, setSort] = useState("all"); // Default sorting state

  // Function to handle sorting
  const sortedTodos = () => {
    switch (sort) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="displaytodos">
      <div className="buttons">
        {/* Sorting buttons */}
        <button onClick={() => setSort("all")}>All</button>
        <button onClick={() => setSort("active")}>Active</button>
        <button onClick={() => setSort("completed")}>Completed</button>
      </div>
      <ul>
        <AnimatePresence>
          {sortedTodos().length > 0 ? (
            sortedTodos().map((todo) => (
              <TodoItem
                key={todo._id}
                item={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
                updateTodo={updateTodo} // Pass updateTodo function here
              />
            ))
          ) : (
            <motion.li>No todos found</motion.li>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
