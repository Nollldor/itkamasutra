import {todolistsAPI, TodolistType} from 'api/todolists-api'
import {appActions, RequestStatusType} from 'app/app-reducer'
import {handleServerNetworkError} from 'utils/error-utils'
import {AppThunk} from 'app/store';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todoId: string }>) => {
            return state.filter(tl => tl.id != action.payload.todoId)
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitle: (state, action: PayloadAction<{ title: string, todoId: string }>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl, title: action.payload.todoId} : tl)
        },
        changeTodolistFilter: (state, action: PayloadAction<{ filter: FilterValuesType, todoID: string }>) => {
            return state.map(tl => tl.id === action.payload.todoID ? {...tl, filter: action.payload.filter} : tl)
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todoId: string, status: RequestStatusType }>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl, entityStatus: action.payload.status} : tl)
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})

export const todolistReducer = slice.reducer
export const todolistActions = slice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setStatus({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(todolistActions.setTodolists({todolists: res.data}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setStatus({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistActions.changeTodolistEntityStatus({todoId: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(todolistActions.removeTodolist({todoId: todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(appActions.setStatus({status: 'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setStatus({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(todolistActions.addTodolist({todolist: res.data.data.item}))
                dispatch(appActions.setStatus({status: 'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(todolistActions.changeTodolistTitle({todoId: id, title}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

