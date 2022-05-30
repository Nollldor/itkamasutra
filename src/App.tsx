import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type FilterType = "all" | "active" | "complete"

function App() {
    /*const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]*/
    /*const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]*/

    let [task, setDeletedTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterType>("all")

    const deleteTask = (id: number) => {
        setDeletedTask(task.filter(el => el.id !== id))
    }

    const filterTask = (filter: FilterType) => {
        setFilter(filter)
    }

    if (filter === "active") {
        task = task.filter(el => el.isDone === false)
    }
    if (filter === "complete") {
        task = task.filter(el => el.isDone === true)
    }
    return (
        <div className="App">
            <ToDoList title={"Learn ToDoList1"} task={task} deleteTask={deleteTask} filterTask={filterTask}/>
            {/*<ToDoList title={"Learn ToDoList2"} task={tasks2} deleteTask={deleteTask}/>*/}
        </div>
    );
}

export default App;