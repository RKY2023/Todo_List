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

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No todo found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                todo
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a todo by ID
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No todo found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                todo
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a todo by ID
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({
                status: 'fail',
                message: 'No todo found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
