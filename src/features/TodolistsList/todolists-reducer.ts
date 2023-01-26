import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppActionsType, appSetErrorAC, appSetStatusAC, RequestStatusType} from "../../app/app-reducer";
import axios, {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case 'CHANGE-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

enum ResultCode {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10
}

// actions
export const changeEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-ENTITY-STATUS',
    id,
    entityStatus
} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(appSetStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(appSetStatusAC('succeeded'))
            })
            .catch(e => {
                handleServerNetworkError(e, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(appSetStatusAC('loading'))
        dispatch(changeEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(appSetStatusAC('succeeded'))
            })
            .catch((e: AxiosError<{ message: string }>) => {
                const error = e.response?.data ? e.response?.data.message : e.message
                dispatch(appSetStatusAC('failed'))
                dispatch(changeEntityStatusAC(todolistId, 'failed'))
                dispatch(appSetErrorAC(error))
            })
    }
}

export const addTodolistTC = (title: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(appSetStatusAC('loading'))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(appSetStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            const error = e.response?.data ? e.response?.data.message : e.message
            dispatch(appSetErrorAC(error))
        }
        handleServerNetworkError({message: '1'}, dispatch)
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(appSetStatusAC('loading'))
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(appSetStatusAC('succeeded'))
            })
            .catch((e: AxiosError<{ message: string }>) => {
                const error = e.response?.data ? e.response?.data.message : e.message
                dispatch(appSetStatusAC('failed'))
                dispatch(changeEntityStatusAC(todolistId, 'failed'))
                dispatch(appSetErrorAC(error))
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | AppActionsType
    | ReturnType<typeof changeEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
