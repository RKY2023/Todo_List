const Todo = require('../models/todoModel');


// default route
exports.getDefault = async (req, res) => {
    try {
        // const todos = await Todo.find();
        res.status(200).json({
            status: 'success',
            results: 1,
            data: {
                title: "Welcome to Todo"
            }
        });
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            status: 'success',
            results: todos.length,
            data: {
                todos
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                todo: newTodo
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
