const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const Todo = require("./models/Todo"); // MongoDB model for Todo

require("dotenv").config(); // Load environment variables

const app = express();

// Enable CORS for all routes
app.use(cors()); // Allow cross-origin requests from all origins

// If you want to restrict to only localhost:3000, use:
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Routes for API
// Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new todo
app.post("/api/todos", async (req, res) => {
  console.log(req.body); // Log the body to ensure it's coming through correctly

  const newTodo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(err); // Log the error to help debug
    res.status(500).json({ message: err.message });
  }
});

// Update a todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
