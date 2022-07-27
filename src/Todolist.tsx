import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemFullInput} from "./AddItemFulInput";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const updateTodolistTitleHandler = (title: string) => props.updateTodolistTitle(props.id, title)


    return <div>
        <h3><EditableSpan title={props.title} updateTitle={updateTodolistTitleHandler}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemFullInput addItem={props.addTask} itemID={props.id}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const updateTaskHandler = (title: string) => props.updateTask(props.id, t.id, title)

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={"primary"} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} updateTitle={updateTaskHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>

                    </div>
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
}


