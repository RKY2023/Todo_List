import { useState } from "react"

type TodoFormProps = {
  addTodo: (text: string) => void
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text.trim())
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Add a new todo"
      className="flex-grow mr-2 p-2 w-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
      Add
      </button>
    </form>
  )
}

