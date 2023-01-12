import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | setTasksAT

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
        case 'CHANGE-TASK-STATUS': {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    status: action.status
                } : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: TaskType[], todoID: string) => {
    return {type: 'SET-TASKS', tasks, todoID} as const
}

export type setTasksAT = ReturnType<typeof setTasksAC>

export const setTasksTC = (todoID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoID).then(res => {
            dispatch(setTasksAC(res.data.items, todoID))
        })
    }
}

export const removeTaskTC = (taskID: string, todoID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todoID, taskID).then(res => {
            dispatch(removeTaskAC(taskID, todoID))
        })
    }
}

export const addTaskTC = (title: string, todoID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todoID, title).then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}

export const updateTaskTC = (taskID: string, todoID: string, status: TaskStatuses) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoID].find(el => el.id === taskID)

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: status,
                priority: task.priority,
                deadline: task.deadline,
                startDate: task.startDate
            }
            todolistsAPI.updateTask(todoID, taskID, model).then(res => {
                const resTask = res.data.data.item
                dispatch(changeTaskStatusAC(resTask.id, resTask.status, resTask.todoListId))
            })
        }

    }
}