"use client"

import { useState, useEffect } from "react"
import TodoForm from "../../components/TodoForm"
import TodoList from "../../components/TodoList"
import FilterButtons from "../../components/FilterButtons"

export type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  
  const addTodo = (title: string, description: string) => {
    setTodos([...todos, { id: Date.now(), title, description, completed: false }])
  }
  
  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }
  
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
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
          setTodos(data.data.todos)
        } else {
          console.error('Failed to fetch todos')
        }
      } catch (error) {
        console.error("Error fetching todos:", error)
      }
    }

    fetchTodos()
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-600 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  )
}
