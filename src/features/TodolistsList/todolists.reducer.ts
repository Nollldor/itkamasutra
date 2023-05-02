import {todolistsAPI, TodolistType} from 'api/todolists-api'
import {appActions, RequestStatusType} from 'app/app.reducer'
import {AppThunk} from 'app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from 'common/actions/common.actions';
import {handleServerNetworkError} from "utils/handle-Server-Network-Error";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";

const initialState: TodolistDomainType[] = []

//thunks

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>('todo/fetchTodolists', async (arg, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}

    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk<any, { id: string }>('todo/removeTodolist', async (arg, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        dispatch(todolistsActions.changeTodolistEntityStatus({id: arg.id, entityStatus: 'loading'}))
        const res = await todolistsAPI.deleteTodolist(arg.id)
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return arg
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
    }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>('todo/addTodolist', async (arg, thunkApi) => {
    const {dispatch, rejectWithValue} = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(arg.title)
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolist: res.data.data.item}
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
    }


})


const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.entityStatus = action.payload.entityStatus
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
                state.unshift(newTodolist)
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist}

// thunks


export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(todolistsActions.changeTodolistTitle({id, title}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
