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
    useEffect(() => {
        todolistAPI.createTodolist('aaaaaaaa')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist('29dfef32-2093-44d6-a7df-70e322181f50')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist('FFFFFFFF','ebf0c56e-35c3-43b9-b224-6f4bb0f20b0f')
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

