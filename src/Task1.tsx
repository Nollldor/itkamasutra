import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./reducers/tasks-reducer";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task1: FC<TaskPropsType> = memo((
    {
        task,
        todolistId
    }) => {

    const dispatch = useDispatch()
    console.log("Task")
    const onClickHandler = () => dispatch(removeTaskAC(todolistId, task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistId, task.id, newIsDoneValue));
    }
    const updateTaskHandler = useCallback((title: string) => dispatch(updateTaskTitleAC(todolistId, task.id, title)), [dispatch])
    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox color={"primary"} onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan title={task.title} updateTitle={updateTaskHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>

        </div>
    )
})