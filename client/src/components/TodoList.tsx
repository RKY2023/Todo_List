import type { Todo } from "../pages/todo/index"
import TodoItem from "./TodoItem"

type TodoListProps = {
  todos: Todo[]
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, title: string, description: string) => void
}

export default function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No todos yet!</p>
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      ))}
    </ul>
  )
}

