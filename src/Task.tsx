import React, {ChangeEvent, FC, memo} from "react";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    updateTask: (taskID: string, title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Task: FC<TaskPropsType> = memo((
    {
        task,
        removeTask,
        updateTask,
        changeTaskStatus
    }) => {
    console.log("Task")
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const updateTaskHandler = (title: string) => updateTask(task.id, title)
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