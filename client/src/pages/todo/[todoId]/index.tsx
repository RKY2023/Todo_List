import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const TodoId: React.FC = () => {
    const router = useRouter();
    const { todoId } = router.query;

    useEffect(() => {
        if (todoId) {
            // const todoItem = TodoApp.todos.find((item) => item.id === todoId);
            // setTodo(todoItem);
        }
    }, [todoId]);

    // if (!todo) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {/* <h1>Todo Item: {todo.title}</h1>
            <p>{todo.description}</p> */}
            Add more todo item details here
        </div>
    );
};

export default TodoId;