import React from "react";

type TaskToDoListPropsType = {
    id: number,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title?: string | number,
    task: Array<TaskToDoListPropsType>
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
                    return <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
