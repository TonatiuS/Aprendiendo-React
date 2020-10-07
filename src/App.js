import React, {useState,useRef, useEffect} from 'react';
import TodoList from './List'

function App() {
    const [todos,setTodos] =useState([])
    const todosNameRefer= useRef();
    const LOCAL_STORAGE= 'todoApp.todos'
    let todosComplete = todos.filter(todo => !todo.complete)

    useEffect(() =>{
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
        if(setTodos) setTodos(storedTodos)
        console.log(storedTodos)
    },[])

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE,JSON.stringify(todos))
    },[todos])

    function handleAddTodo(e) {
        const name = todosNameRefer.current.value
        if (name === "") return
        todosNameRefer.current.value = null
        setTodos(prevTodos =>{
            
            return [...prevTodos,{id:(prevTodos.length +1 ),name: name, complete: false}]
        })
    }

    function toogleTodos(id) {
        
        const newTodos = [...todos]
        const todo = newTodos.find(todos => todos.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }
    function handleClearTodos() {

        const newTodos= todosComplete
        setTodos(newTodos)
        
    }

    return(
        <>
            <TodoList TodoList={todos}  toogleTodos={toogleTodos} />
            <br></br>
            <br></br>
            <input ref={todosNameRefer} type = "text"/>
            <button onClick={handleAddTodo} >Agregar Tarea</button>
            <br></br>
            <br></br>
            <button onClick={handleClearTodos}>Limpiar Completadas</button>
           
            <div> {todosComplete.length} tareas por realizar</div>
        </>
    )
    
}

export default App;
