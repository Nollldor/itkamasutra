import React, {useState} from 'react';
import './App.css';
import {Todolist} from './ToDoList';
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
        const copyTasks = {...tasks}
        let task = copyTasks[todoListID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks(copyTasks);
    }

    function addTask(todoListID: string, title: string) {
        const copyTasks = {...tasks}
        const newTask = {id: v1(), title: title, isDone: false};
        copyTasks[todoListID] = [newTask, ...copyTasks[todoListID]]
        setTasks(copyTasks);
    }

    function removeTask(todoListId: string, taskId: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = tasks[todoListId].filter(t => t.id != taskId);
        setTasks(copyTasks)
    }

    function changeFilter(todoListId: string, filterValue: FilterValuesType) {
        const copyTodoLists = [...todoLists]
        const filteredTodolist = copyTodoLists.find(todoList => todoList.id === todoListId)
        filteredTodolist && (filteredTodolist.filter = filterValue)

        setTodoLists(copyTodoLists)
    }

    const removeTodoList = (todoListID: string) => {
        let copyTodoLists = [...todoLists]
        let copyTasks = {...tasks}
        copyTodoLists = copyTodoLists.filter(todoList => todoList.id !== todoListID)
        delete copyTasks[todoListID]
        setTasks(copyTasks)
        setTodoLists(copyTodoLists)


    }

    const mappedTodoLists = todoLists.map(todoList => {

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
                removeTodoList={removeTodoList}
                filter={todoList.filter}
            />
        )
    })

    return (
        <div className="App">
            {mappedTodoLists}

        </div>
    );
}

export default App;
