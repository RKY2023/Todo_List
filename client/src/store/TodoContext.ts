import React, { createContext, useReducer, useContext, ReactNode, FC } from 'react';

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

interface TodoContextType {
    todos: Todo[];
    dispatch: React.Dispatch<ActionType>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export default TodoContext;
