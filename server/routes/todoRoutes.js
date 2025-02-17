const express = require('express');
const todoController = require('../controllers/todoController');
const { auth } = require('../controllers/authController');

const router = express.Router();

// Get all todos
router.get('/', auth, todoController.getAllTodos);

// Get all todos for a user
router.post('/getTodo', auth, todoController.getAllTodos);

// Create a new todo
router.post('/', auth, todoController.createTodo);

// Get a single todo by ID
router.get('/:id', auth, todoController.getTodoById);

// Update a todo by ID
router.put('/:id', todoController.updateTodo);

// Delete a todo by ID
router.delete('/:id', todoController.deleteTodo);

module.exports = router;