import React, { createContext, useReducer, useContext, ReactNode, FC } from 'react';
import TodoContext from './TodoContext';

interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

type ActionType = 
    | { type: 'SET_TODOS'; payload: Todo[] }
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'REMOVE_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: string }
    | { type: 'UPDATE_TODO'; payload: { id: string, title: string, description: string } };

const todoReducer = (state: Todo[], action: ActionType): Todo[] => {
    switch (action.type) {
        case 'SET_TODOS':
            return [...action.payload];
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'REMOVE_TODO':
            return state.filter(todo => todo._id !== action.payload);
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo._id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'UPDATE_TODO':
            return state.map(todo =>
                todo._id === action.payload.id ? { ...todo, title: action.payload.title, description: action.payload.description } : todo
            );
        default:
            return state;
    }
};

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: FC<TodoProviderProps> = ({ children } : TodoProviderProps) => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    return (
        <TodoContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
};
