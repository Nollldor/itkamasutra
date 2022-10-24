import React, {ChangeEvent, FC, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    todolistId: string
    taskId: string
    isDone: boolean
    title: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task:FC<TaskPropsType> = ({
                                           todolistId,
                                           taskId,
                                           isDone,
                                           title,
                                           removeTask,
                                           changeTaskStatus,
                                           changeTaskTitle

                                       }) => {
    const onClickHandler = () => removeTask(taskId, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(taskId, newIsDoneValue, todolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(taskId, newValue, todolistId);
    },[changeTaskTitle, todolistId])


    return <div className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
}