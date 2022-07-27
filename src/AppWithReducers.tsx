import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemFullInput} from "./AddItemFulInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "./reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(taskId: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(todolistId, taskId))
    }

    function addTask(todolistId: string, title: string) {
        dispatchToTasks(addTaskAC(todolistId, title))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTodolistFilter(filterValue: FilterValuesType, todolistId: string) {
        dispatchToTodolists(ChangeTodoListFilterAC(todolistId, filterValue))
    }

    function removeTodolist(todoId: string) {
        const removeTodolistAction = RemoveTodoListAC(todoId)
        dispatchToTodolists(removeTodolistAction)
        dispatchToTasks(removeTodolistAction)
    }

    function addTodolist(todoId: string, title: string) {
        const AddTodolistAction = AddTodolistAC(title)
        dispatchToTodolists(AddTodolistAction)
        dispatchToTasks(AddTodolistAction)
    }

    function updateTaskTitle(todoID: string, taskID: string, title: string) {
        dispatchToTasks(updateTaskTitleAC(todoID, taskID, title))
    }

    function changeTodolistTitle(todoID: string, title: string) {
        dispatchToTodolists(ChangeTodolistTitleAC(todoID, title))
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemFullInput itemID={v1()} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist

                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTaskTitle}
                                        updateTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );

}
