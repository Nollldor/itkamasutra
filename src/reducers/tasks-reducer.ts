import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistAC, RemoveTodoListAC} from "./todolists-reducer";


export type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof updateTaskTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodoListAC>


export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {...tasks, [action.todoId]: tasks[action.todoId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...tasks, [action.todoId]: [{id: v1(), title: action.title, isDone: true}, ...tasks[action.todoId]]}
        case "UPDATE-TASK-TITLE":
            return {
                ...tasks,
                [action.todoId]: tasks[action.todoId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todoId]: tasks[action.todoId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.status
                } : t)
            }
        case "ADD-TODOLIST":
            return {...tasks, [action.todoId]: []}
        case "REMOVE-TODOLIST":
            const copyTasks = {...tasks}
            delete copyTasks[action.todoId]
            return copyTasks
        default:
            return tasks
    }
    return tasks
}

export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: "REMOVE-TASK",
    todoId,
    taskId
} as const)

export const addTaskAC = (todoId: string, title: string) => ({
    type: "ADD-TASK",
    todoId,
    title
} as const)

export const changeTaskStatusAC = (todoId: string, taskId: string, status: boolean) => ({
    type: "CHANGE-TASK-STATUS",
    todoId,
    taskId,
    status
} as const)

export const updateTaskTitleAC = (todoId: string, taskId: string, title: string) => ({
    type: "UPDATE-TASK-TITLE",
    todoId,
    taskId,
    title
} as const)
