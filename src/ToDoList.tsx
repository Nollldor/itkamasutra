import React from "react";
import {FilterType} from "./App";

type TaskToDoListPropsType = {
    id: number,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title?: string | number,
    task: Array<TaskToDoListPropsType>
    deleteTask: (id: number) => void
    filterTask: (filter: FilterType) => void
}


export const ToDoList = (props: ToDoListPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(el => {
                    return <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        <button onClick={() => props.deleteTask(el.id)}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={() => props.filterTask("all")}>All</button>
                <button onClick={() => props.filterTask("active")}>Active</button>
                <button onClick={() => props.filterTask("complete")}>Completed</button>
            </div>
        </div>
    );
}