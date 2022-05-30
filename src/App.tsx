import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";


function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    const [task, setTask] = useState(tasks1)

    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    const [filteredTask, setFilteredTask] = useState(tasks2)


    const deleteInput = (id: number) => {

        setTask(task.filter((el) => el.id !== id))
    }

    const filterElements = (filter: "all" | "active" | "complete") => {
        if (filter === "active") {
            setFilteredTask(tasks2.filter(el => el.isDone === false))
        }
        if (filter === "complete") {
            setFilteredTask(tasks2.filter(el => el.isDone === true))
        }
        if (filter === "all") {
            setFilteredTask(tasks2)
        }
    }

    return (
        <div className="App">
            <ToDoList title={"Learn ToDoList1"} task={task} deleteInput={deleteInput}
                      filterElements={filterElements}/>
            <ToDoList title={"Learn ToDoList2"} task={filteredTask} deleteInput={deleteInput}
                      filterElements={filterElements}/>
        </div>
    );
}

export default App;
