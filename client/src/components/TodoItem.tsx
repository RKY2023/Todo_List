import type { Todo } from "../pages/todo/index"
import { Trash2 } from "lucide-react"

type TodoItemProps = {
  todo: Todo
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
      <div className="flex items-center space-x-2">
      <input type="checkbox" id={`todo-${todo._id}`} checked={todo.completed} onChange={() => toggleTodo(todo._id)} />
      <label
        htmlFor={`todo-${todo._id}`}
        className={`${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
      >
        {todo.title}
      </label>
      </div>
      <button
      onClick={() => deleteTodo(todo._id)}
      className="text-red-500 hover:text-red-700 flex items-center"
      >
      <Trash2 className="h-4 w-4" />
      </button>
    </li>
  )
}

