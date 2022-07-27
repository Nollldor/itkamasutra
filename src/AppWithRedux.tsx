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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TasksStateType, TodolistType} from "./App";

export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    function addTask(todolistId: string, title: string) {
        dispatch(addTaskAC(todolistId, title))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTodolistFilter(filterValue: FilterValuesType, todolistId: string) {
        dispatch(ChangeTodoListFilterAC(todolistId, filterValue))
    }

    function removeTodolist(todoId: string) {
        dispatch(RemoveTodoListAC(todoId))

    }

    function addTodolist(todoId: string, title: string) {
        dispatch(AddTodolistAC(title))
        
    }

    function updateTaskTitle(todoID: string, taskID: string, title: string) {
        dispatch(updateTaskTitleAC(todoID, taskID, title))
    }

    function changeTodolistTitle(todoID: string, title: string) {
        dispatch(ChangeTodolistTitleAC(todoID, title))
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
