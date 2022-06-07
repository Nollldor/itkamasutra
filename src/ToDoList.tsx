import React from 'react';
import {FilterValuesType} from './App';
import {Input} from "./Input";
import {Button} from "./components/Button";

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
    addMessage: (title: string) => void
}

export function Todolist(props: PropsType) {


    const onChangeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input addMessage={props.addMessage}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {


                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        {/*<button onClick={() => removeTaskHandler(t.id)}>x
                        </button>*/}
                        <Button title={"x"} callback={() => removeTaskHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            {/*<button onClick={() => {
                onChangeFilterHandler("all")
            }}>All
            </button>
            <button onClick={() => {
                onChangeFilterHandler("active")
            }}>Active
            </button>
            <button onClick={() => {
                onChangeFilterHandler("completed")
            }}>Completed
            </button>*/}
            <Button title={"All"} callback={() => {
                onChangeFilterHandler("all")
            }}/>
            <Button title={"Active"} callback={() => {
                onChangeFilterHandler("active")
            }}/>
            <Button title={"Completed"} callback={() => {
                onChangeFilterHandler("completed")
            }}/>
        </div>
    </div>
}
