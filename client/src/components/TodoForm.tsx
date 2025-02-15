import { useEffect, useState } from "react"

type TodoFormProps = {
  addTodo: (id: string, title: string, description: string) => void
  updateTodo: (id: string, title: string, description: string) => void
  editableTodo: {id: string, title: string, description: string} | null
  editNullTodo: () => void
}

export default function TodoForm({ addTodo, updateTodo, editableTodo, editNullTodo }: TodoFormProps) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}`+'/todos';
    if(isUpdateMode) {
      apiURL = `${process.env.NEXT_PUBLIC_API_URL}`+'/todos/'+ editableTodo?.id;
      setIsUpdateMode(false);
    }
    if (title.trim()) {
      try {
        const response = await fetch(apiURL, {
          method: isUpdateMode ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({ title: title.trim(), description: description.trim() }),
        })
        if (response.ok) {
          const newTodo = await response.json();

          if(isUpdateMode) {
            editNullTodo(); 
            setIsUpdateMode(false);
            if (editableTodo) {
              updateTodo(editableTodo.id, title, description);
            }
          } else {
            addTodo(newTodo.data.todo._id, title, description)
          }
          setTitle("")
          setDescription("")
        } else {
          console.error('Failed to add todo')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  useEffect(() => {
    if(editableTodo) {
      setIsUpdateMode(true);
      
      const setEditableTodo = async () => {
        if (editableTodo) {
          setTitle(editableTodo.title);
          setDescription(editableTodo.description);
        }
      }
      setEditableTodo();
    }
  }, [editableTodo, isUpdateMode]);

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="text-gray-700 font-semibold">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
        />
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <label htmlFor="description" className="text-gray-700 font-semibold">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
        />
      </div>      
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
      {isUpdateMode ? 'Update' : 'Add'} 
      </button>
    </form>
  )
}

