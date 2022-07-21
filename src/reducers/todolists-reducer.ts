import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todoId: string
}

type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoId: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoId: string
    title: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoId: string
    filter: FilterValuesType
}


export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id != action.todoId)
        case "ADD-TODOLIST":
            return [{id: action.todoId, title: action.title, filter: "all"}, ...todolists]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(el => el.id === action.todoId ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(el => el.id === action.todoId ? {...el, filter: action.filter} : el)
        default:
            return todolists
    }
    return todolists
}

export const RemoveTodoListAC = (todoId: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    todoId
})

export const AddTodolistAC = (title: string): AddTodolistAT => ({
    type: "ADD-TODOLIST",
    todoId: v1(),
    title
})

export const ChangeTodolistTitleAC = (todoId: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    todoId,
    title
})

export const ChangeTodoListFilterAC = (todoId: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    todoId,
    filter
})
