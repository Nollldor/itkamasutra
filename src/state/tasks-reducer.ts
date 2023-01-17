import {TasksStateType} from '../App';
import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId], action.task]
            };
        }
        case 'UPDATE-TASK': {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    ...action.model
                } : el)
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOS': {
            let copyTasks = {...state}
            action.todolists.forEach((tl) => {
                copyTasks[tl.id] = []
            })
            return copyTasks
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todoID]: action.tasks
            }
        }
        default:
            return state;
    }
}


export const removeTaskAC = (taskId: string, todolistId: string) => (
    {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)

export const addTaskAC = (task: TaskType) => (
    {type: 'ADD-TASK', task} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => (
    {type: 'UPDATE-TASK', model, todolistId, taskId} as const)

export const setTasksAC = (tasks: TaskType[], todoID: string) => (
    {type: 'SET-TASKS', tasks, todoID} as const)


export const setTasksTC = (todoID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoID).then(res => {
            dispatch(setTasksAC(res.data.items, todoID))
        })
    }
}

export const removeTaskTC = (taskID: string, todoID: string) => ((dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todoID, taskID).then(res => {
            dispatch(removeTaskAC(taskID, todoID))
        })
    }
)

export const addTaskTC = (title: string, todoID: string) => (
    (dispatch: Dispatch) => {
        todolistsAPI.createTask(todoID, title).then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
)

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskID: string, todoID: string, domainModel: UpdateDomainTaskModelType) => ((dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoID].find(el => el.id === taskID)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline,
                startDate: task.startDate,
                ...domainModel
            }

            todolistsAPI.updateTask(todoID, taskID, apiModel).then(res => {
                const resTask = res.data.data.item
                dispatch(updateTaskAC(resTask.id, apiModel, resTask.todoListId))
            })
        }

    }
)