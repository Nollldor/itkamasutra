import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'
import {AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {todolistActions} from "features/TodolistsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
            const index = state[action.payload.todoId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todoId].splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ todoId: string, task: TaskType }>) => {
            state[action.payload.todoId].unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{ todoId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
        },
        setTask: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        resetState: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            })
            .addCase(todolistActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
    }
})

export const taskReducer = slice.reducer
export const taskActions = slice.actions


// thunks

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(taskActions.setTask({todolistId, tasks}))
            dispatch(appActions.setStatus({status: 'succeeded'}))
        })
};
export const removeTaskTC = (taskId: string, todoId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todoId, taskId)
        .then(res => {
            const action = taskActions.removeTask({todoId, taskId})
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setStatus({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = taskActions.addTask({todoId: todolistId, task})
                dispatch(action)
                dispatch(appActions.setStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoId: string): AppThunk =>
    (dispatch, getState) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todoId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = taskActions.updateTask({taskId, model: apiModel, todoId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }




