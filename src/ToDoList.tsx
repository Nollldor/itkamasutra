import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todoID: string, taskID: string, title: string) => void
    changeTodolistTitle: (todoID: string, title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

            const editTask = (title: string) => {
                props.changeTaskTitle(props.id, t.id, title)
            }
            return (
                <li key={t.id}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={t.isDone}

                    />
                    <EditableSpan title={t.title} editTitle={editTask} className={t.isDone ? "task isDone" : "task"}/>
                    <button onClick={removeTask}>х</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    const createOnClickHandler = (filter: FilterValuesType): () => void => {
        const onClickHandler = () => props.changeTodoListFilter(filter, props.id)
        return onClickHandler
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const editTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} editTitle={editTodolistTitle}/>
                <button onClick={removeTodolist}>Del</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : ""}
                    onClick={createOnClickHandler("all")}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active" : ""}
                    onClick={createOnClickHandler("active")}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={createOnClickHandler("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
};