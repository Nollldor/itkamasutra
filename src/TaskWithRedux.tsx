import React, {ChangeEvent, FC, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const TaskWithRedux: FC<TaskPropsType> = memo(({
                                                     todolistId,
                                                     task,

                                                 }) => {
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch])

    const onClickHandler = () => removeTask(task.id, todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }, [changeTaskTitle, todolistId])

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />
        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>

    </div>
})