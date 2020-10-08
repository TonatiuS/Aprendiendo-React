import React from 'react'
import TodoComponent from './Todo'

//puente entre component todo y app
export default function TodoList({TodoList,toogleTodos}){

    return(
       TodoList.map(todo => {
           return <TodoComponent key={todo.id} todo={todo} toogleTodos={toogleTodos} />
       })
    )
}