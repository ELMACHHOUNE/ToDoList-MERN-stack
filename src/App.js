import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";
import "./css/main.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  // Fetching Todos from the backend
  useEffect(() => {
    axios
      .get("https://todolist-mern-stack-dthl.onrender.com/api/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        alert("There was an error fetching the todos. Please try again.");
      });
  }, []);

  // Add new todo
  const addTodo = (text) => {
    axios
      .post("https://todolist-mern-stack-dthl.onrender.com/api/todos", {
        text,
        completed: false,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        alert("There was an error adding the todo. Please try again.");
      });
  };

  // Remove todo
  const removeTodo = (id) => {
    axios
      .delete(`https://todolist-mern-stack-dthl.onrender.com/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error removing todo:", error);
        alert("There was an error removing the todo. Please try again.");
      });
  };

  // Mark todo as complete
  const completeTodo = (id) => {
    axios
      .put(`https://todolist-mern-stack-dthl.onrender.com/api/todos/${id}`, {
        completed: true,
      })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error completing todo:", error);
        alert("There was an error completing the todo. Please try again.");
      });
  };

  const updateTodo = (id, text) => {
    axios
      .put(`https://todolist-mern-stack-dthl.onrender.com/api/todos/${id}`, {
        text,
      }) // <-- This URL might not be correct
      .then(() => {
        setTodos(
          todos.map((todo) => (todo._id === id ? { ...todo, text } : todo))
        );
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        alert("There was an error updating the todo. Please try again.");
      });
  };

  return (
    <div className="App">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        ELMACHHOUNE's Todo App
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos todo={todo} setTodo={setTodo} addTodo={addTodo} />
        <DisplayTodos
          todos={todos}
          removeTodo={removeTodo}
          completeTodo={completeTodo}
          updateTodo={updateTodo} // Pass updateTodo here
        />
      </motion.div>
    </div>
  );
}

export default App;
