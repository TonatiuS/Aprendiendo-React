import React from 'react'
import TodoComponent from './Todo'


export default function TodoList({TodoList,toogleTodos}){
    return(
       TodoList.map(todo => {
           return <TodoComponent key={todo.id} todo={todo} toogleTodos={toogleTodos} />
       })
    )
}