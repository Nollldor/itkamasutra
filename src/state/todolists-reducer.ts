import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

type ActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [action.todo, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOS':
            return action.todolists.map(td => ({...td, filter: 'all'}))
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => (
    {type: 'REMOVE-TODOLIST', id: todolistId} as const)

export const addTodolistAC = (todo: TodolistDomainType) => (
    {type: 'ADD-TODOLIST', todo} as const)

export const changeTodolistTitleAC = (id: string, title: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => (
    {type: 'SET-TODOS', todolists} as const)


export const getTodoTC = () => {
    return (dispatch: Dispatch) => {

        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodoTC = (todoID: string) => (
    (dispatch: Dispatch) => {

        todolistsAPI.deleteTodolist(todoID)
            .then((res) => {
                dispatch(removeTodolistAC(todoID))
            })
    }
)

export const addTodoTC = (title: string) => (
    (dispatch: Dispatch) => {

        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({...res.data.data.item, filter: 'all'}))
            })
    }
)
