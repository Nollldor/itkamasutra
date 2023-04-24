import {taskReducer} from 'features/TodolistsList/tasks-reducer';
import {todolistReducer} from 'features/TodolistsList/todolists-reducer';
import {AnyAction, combineReducers} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from 'features/auth/auth-reducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    //санки работают из без Middleware, но если саги или логгеры
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})


export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
