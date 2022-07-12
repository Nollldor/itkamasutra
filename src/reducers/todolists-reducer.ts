import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            return [{id: action.id, title: action.title, filter: "all"}, ...todolists]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return todolists
    }
    return todolists
}

export const RemoveTodoListAC = (id: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const AddTodolistAC = (id: string, title: string): AddTodolistAT => ({
    type: "ADD-TODOLIST",
    id,
    title
})

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})

export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})
