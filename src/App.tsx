import React, {useState} from 'react';
import './App.css';

import {v1} from "uuid";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";

// CRUD
// create +
// read ++
// update +
// delete +

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

export function App() {
    //BLL:
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
        ],
    })

    const removeTask = (taskID: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    const addTodoList = (title: string) => {
        const newTodolistID = v1()

        setTodolists([...todolists, {id: newTodolistID, title, filter: "all"}])
        setTasks({...tasks, [newTodolistID]: []})
    }

    const changeTaskTitle = (todoID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todoID]: tasks[todoID].map((el) => el.id === taskID ? {...el, title} : el)})
    }

    const changeTodolistTitle = (todoID: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todoID ? {...el, title} : el))
    }
    // UI:
    const todolistsComponents = todolists.map(tl => {
        let tasksForRender;
        switch (tl.filter) {
            case "active":
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                break
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
                break
            default:
                tasksForRender = tasks[tl.id]
        }
        return (
            <TodoList
                key={tl.id}

                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}
                changeTaskTitle={changeTaskTitle}
                addTask={addTask}
                removeTask={removeTask}
                removeTodolist={removeTodolist}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolistsComponents}
        </div>
    );
}
