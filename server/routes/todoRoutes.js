const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// Get all todos
router.get('/', todoController.getAllTodos);

// Create a new todo
router.post('/', todoController.createTodo);

// Get a single todo by ID
router.get('/:id', todoController.getTodoById);

// Update a todo by ID
router.put('/:id', todoController.updateTodo);

// Delete a todo by ID
router.delete('/:id', todoController.deleteTodo);

module.exports = router;