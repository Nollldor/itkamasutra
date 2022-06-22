import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TaskStateType = {
    [todoListID: string]: TaskType[]
}

function App() {


    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    //

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "apples", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Cheese", isDone: false},
        ]
    })
    
    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        let task = tasks[todoListID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks, [todoListID]: [...tasks[todoListID]]});
    }

    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks[todoListID]];
        setTasks({...tasks, [todoListID]: newTasks});
    }

    function removeTask(todoListId: string, taskId: string) {
        const filteredTasks = tasks[todoListId].filter(t => t.id != taskId);
        setTasks({...tasks, [todoListId]: filteredTasks});
    }

    function changeFilter(todoListId: string, filterValue: FilterValuesType) {
        const filteredTodolist = todoLists.find(todoList => todoList.id === todoListId)
        filteredTodolist && (filteredTodolist.filter = filterValue)

        setTodoLists([...todoLists])
    }


    return (
        <div className="App">

            {todoLists.map(todoList => {

                let tasksForTodolist = tasks[todoList.id];

                if (todoList.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (todoList.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeFilter={changeFilter}
                        filter={todoList.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
