import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'aa4d6d6d-ce89-48a6-9ff2-f1882bdbfab4'
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResType<{item1: TodolistType}>>(`todo-lists`, {title})
    },
    updateTodolist(title: string, id: string) {
        return instance.put<ResType>(`todo-lists/${id}`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResType>(`todo-lists/${id}`)
    }
}