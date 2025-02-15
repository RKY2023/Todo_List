"use client"

import { useState, useEffect } from "react"
import TodoForm from "../../components/TodoForm"
import TodoList from "../../components/TodoList"
import FilterButtons from "../../components/FilterButtons"
import { useTodos } from "../../store/TodoProvider"

export type Todo = {
  _id: string
  title: string
  description: string
  completed: boolean
};

export default function TodoApp() {
  const { todos, dispatch } = useTodos();
  const [editableTodo, setEditableTodo] = useState<{ id: string; title: string; description: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (id: string, title: string, description: string) => {
    dispatch({ type: 'ADD_TODO', payload: { _id: id, title, description, completed: false } })
  }

  const editTodo = (id: string, title: string, description: string) => {
    setEditableTodo({id, title, description});
  }

  const editNullTodo = () => {
    setEditableTodo(null);
  }

  const updateTodo = (id: string, title: string, description: string) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, title, description } })
  }
  
  const toggleTodo = async (id: string) => {
    const selectedTodo = todos.find((todo) => todo._id === id);
    if(selectedTodo) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`+'/todos/'+selectedTodo._id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !selectedTodo.completed }),
        })
        if (response.ok) {
          dispatch({ type: 'TOGGLE_TODO', payload: selectedTodo._id })
        } else {
          console.error('Failed to mark todo as completed')
        }
      } catch (error) {
        console.error("Error fetching api", error)
      }
    }
  }
  
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`+'/todos/'+id, {
        method: 'DELETE',
      })
      if (response.ok && response.status === 204) {
        dispatch({ type: 'REMOVE_TODO', payload: id })
      } else {
        console.error('Failed to delete todo')
      }
    } catch (error) {
      console.error("Error fetching api", error)
    }
  }
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`+'/todos')
        const data = await response.json()
        if (data.status && data.status === "success") {
          dispatch({ type: 'SET_TODOS', payload: data.data.todos });
        } else {
          console.error('Failed to fetch todos')
        }
      } catch (error) {
        console.error("Error fetching todos:", error)
      }
    }

    fetchTodos()
  }, [dispatch])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-600 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
      <TodoForm addTodo={addTodo} updateTodo={updateTodo} editableTodo={editableTodo} editNullTodo={editNullTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
}
