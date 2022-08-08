import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemFullInput} from "./AddItemFulInput";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task1} from "./Task1";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todoID: string, taskID: string, title: string) => void
    updateTodolistTitle: (todoID: string, title: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log("todolist")
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const updateTodolistTitleHandler = useCallback((title: string) => props.updateTodolistTitle(props.id, title), [props.id, props.updateTodolistTitle])

    /*let tasks = props.tasks;*/
    let tasks = [...props.tasks];

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    /*const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }, [props.changeTaskStatus, props.id])
    const updateTask = useCallback((taskId: string, title: string) => props.updateTask(props.id, taskId, title), [props.id, props.updateTask])*/

    return <div>
        <h3><EditableSpan title={props.title} updateTitle={updateTodolistTitleHandler}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemFullInput addItem={props.addTask} itemID={props.id}/>
        <div>
            {
                tasks.map(t => {


                    return <Task1 key={t.id} task={t} todolistId={props.id}/>
                })
            }
        </div>
        <div>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === 'all' ? "primary" : "default"}
                /*className={props.filter === 'all' ? "active-filter" : ""}*/
                onClick={onAllClickHandler}
            >All
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === 'active' ? "primary" : "default"}
                /*className={props.filter === 'active' ? "active-filter" : ""}*/
                onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === 'completed' ? "primary" : "default"}
                /*className={props.filter === 'completed' ? "active-filter" : ""}*/
                onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>
})


