import React, {ChangeEvent, FC, memo} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {EditableSpan} from 'common/components'
import {TaskStatuses} from 'common/enums';
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/tasks.reducer";
import {TaskType} from "features/todolists-list/tasks/tasks.api";
import styles from "features/todolists-list/Todolist/Tasks/Task/Task.module.css"

type Props = {
    task: TaskType
    todolistId: string
}

export const Task: FC<Props> = memo(({task, todolistId}) => {
    const {removeTask, updateTask} = useActions(tasksThunks)

    const removeTaskHandler = () => removeTask({
        taskId: task.id,
        todolistId: todolistId
    })

    const ChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTask({
            taskId: task.id,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId
        })
    }

    const changeTaskTitleHandler = (title: string) => {
        updateTask({taskId: task.id, domainModel: {title}, todolistId})
    }

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? styles.isDone : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={ChangeTaskStatusHandler}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
})
