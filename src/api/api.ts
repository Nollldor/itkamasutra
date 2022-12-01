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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type ResType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    updateTodolist(title: string, id: string) {
        return instance.put<ResType>(`todo-lists/${id}`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResType>(`todo-lists/${id}`)
    },
    getTasks(todoID: string) {
        return instance.get<GetTaskType>(`todo-lists/${todoID}/tasks`)
    },
    createTask(todoID: string, title: string) {
        return instance.post<ResType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks`, {title})
    },
    updateTask(todoID: string, taskID: string, title: string) {
        return instance.put<ResType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks/${taskID}`, {
            title,
            "description": null,
            "status": 0,
            "priority": 1,
            "startDate": null,
            "deadline": null,
        })
    },
    deleteTask(todoID: string, taskID: string) {
        return instance.delete<ResType>(`todo-lists/${todoID}/tasks/${taskID}`)
    },

}