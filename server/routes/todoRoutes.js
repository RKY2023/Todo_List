const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// router.get('/', (req, res) => res.send("Express on Vercel"));

// Get all todos
router.get('/', todoController.getAllTodos);

// // Get a single todo by ID
// router.get('/:id', todoController.getTodoById);

// Create a new todo
router.post('/', todoController.createTodo);

// // Update a todo by ID
// router.put('/:id', todoController.updateTodo);

// // Delete a todo by ID
// router.delete('/:id', todoController.deleteTodo);

module.exports = router;