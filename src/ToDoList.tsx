import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTaskHandler: () => void
    titleInput: string
    inputOnChange: (newTitle: string) => void
    onKeyPressHandler: (code: string) => void
}

export function Todolist(props: PropsType) {


    /*const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");*/

    const changeFilter = (filter: FilterValuesType) => props.changeFilter(filter)

    const onClickHandler = (id: string) => props.removeTask(id)


    return <div>
        <h3>{props.title}</h3>
        {/*<div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />

            <Button title={"+"} callback={addTask}/>
            <button onClick={addTask}>+</button>
        </div>*/}
        {/*<FullInput addTask={props.addTask}/>*/}
        <Input title={props.titleInput} callback={props.inputOnChange} callbackKey={props.onKeyPressHandler}/>
        <Button title={"+"} callback={props.addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {

                    /*const onClickHandler = () => props.removeTask(t.id)*/

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>

                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <Button title={"x"} callback={() => onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>*/}

            <Button title={"All"} callback={() => changeFilter("all")}/>
            <Button title={"Active"} callback={() => changeFilter("active")}/>
            <Button title={"Completed"} callback={() => changeFilter("completed")}/>

        </div>
    </div>
}
