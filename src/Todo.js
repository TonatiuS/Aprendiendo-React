import React from 'react'

export default function TodoComponent({todo,toogleTodos}) {
function handleToogleTodosClick (){
    //console.log(todo.id)
    toogleTodos(todo.id)
}

    return (
        <div>

            <label>
            <input type = "checkbox" checked={todo.complete} onChange={handleToogleTodosClick} /> 
            {todo.name}
            </label>
        </div>
    )
}
