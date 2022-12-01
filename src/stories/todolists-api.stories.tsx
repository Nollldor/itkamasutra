import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        todolistAPI.getTodolists().then(res => setState(res.data))
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data))
    }

    return <>
        <input type="text" placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={createTodolist}>Create Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistID)
            .then(res => setState(res.data))
    }

    return <>
        <input type="text" placeholder={"todolistID"} value={todolistID}
               onChange={e => setTodolistID(e.currentTarget.value)}/>
        <button onClick={deleteTodolist}>Create Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistAPI.updateTodolist(title, todolistID)
            .then(res => setState(res.data))
    }

    return <>
        <input type="text" placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <input type="text" placeholder={"todolistID"} value={todolistID}
               onChange={e => setTodolistID(e.currentTarget.value)}/>
        <button onClick={updateTodolist}>Update Todolist</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')

    const getTasks = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        todolistAPI.getTasks(todolistID).then(res => setState(res.data.items))
        // который в виде строки будем отображать в div-ке

    }

    return <>
        <input type="text" placeholder={"todolistID"} value={todolistID}
               onChange={e => setTodolistID(e.currentTarget.value)}/>
        <button onClick={getTasks}>Get Tasks</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const CreateTask = () => {
    const [todolistID, setTodolistID] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const createTask = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        todolistAPI.createTask(todolistID, title).then(res => setState(res.data))
        // который в виде строки будем отображать в div-ке
    }

    return <>
        <input type="text" placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <input type="text" placeholder={"todolistID"} value={todolistID}
               onChange={e => setTodolistID(e.currentTarget.value)}/>
        <button onClick={createTask}>Create Task</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const updateTask = () => {
    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const updateTask = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        todolistAPI.updateTask(todolistID, taskID, title).then(res => setState(res.data.data.item))
        // который в виде строки будем отображать в div-ке

    }

    return <>
        <input type="text" placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <input type="text" placeholder={"todolistID"} value={todolistID}
               onChange={e => setTodolistID(e.currentTarget.value)}/>
        <input type="text" placeholder={"taskID"} value={taskID}
               onChange={e => setTaskID(e.currentTarget.value)}/>
        <button onClick={updateTask}>Update Task</button>
        <div>{JSON.stringify(state)}</div>
    </>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const deleteTask = () => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        todolistAPI.deleteTask(todolistID, taskID).then(res => setState(res.data))
        // который в виде строки будем отображать в div-ке

    }

    return <>
        <input type="text" placeholder={"todolistID"} value={todolistID}
               onChange={e => setTodolistID(e.currentTarget.value)}/>
        <input type="text" placeholder={"taskID"} value={taskID}
               onChange={e => setTaskID(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete Task</button>
        <div>{JSON.stringify(state)}</div>
    </>
}