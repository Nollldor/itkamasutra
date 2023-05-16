import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {EditableSpan} from 'common/components'
import {TaskStatuses} from 'common/enums';
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/tasks.reducer";
import {TaskType} from "features/todolists-list/tasks/tasks.api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const {removeTask, updateTask} = useActions(tasksThunks)

    const removeTaskHandler = () => removeTask({
        taskId: props.task.id,
        todolistId: props.todolistId
    })

    const ChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTask({
            taskId: props.task.id,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        })
    }


    const changeTaskTitleHandler = (title: string) => {
        updateTask({taskId: props.task.id, domainModel: {title}, todolistId: props.todolistId})
    }

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={ChangeTaskStatusHandler}
        />

        <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
})
