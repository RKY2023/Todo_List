"use client"

import { useState } from "react"
import TodoForm from "../../components/TodoForm"
import TodoList from "../../components/TodoList"
import FilterButtons from "../../components/FilterButtons"

export type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-600 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  )
}
