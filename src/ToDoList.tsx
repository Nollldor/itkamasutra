import React from "react";


type ToDoListPropsType = {
    title?: string | number,
    task: Array<TaskToDoListPropsType>
    deleteInput: (id: number) => void
    filterElements: (filter: "all" | "active" | "complete") => void
}

type TaskToDoListPropsType = {
    id: number,
    title: string,
    isDone: boolean
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
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            <button onClick={() => {
                                props.deleteInput(el.id)
                            }}>-
                            </button>
                        </li>

                    );
                })}

            </ul>
            <div>
                <button onClick={() => props.filterElements("all")}>All</button>
                <button onClick={() => props.filterElements("active")}>Active</button>
                <button onClick={() => props.filterElements("complete")}>Completed</button>
            </div>
        </div>
    );
}
