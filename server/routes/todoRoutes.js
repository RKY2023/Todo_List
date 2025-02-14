const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// Get all todos
router.get('/', todoController.getAllTodos);

// Create a new todo
router.post('/', todoController.createTodo);

module.exports = router;