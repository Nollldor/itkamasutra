import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodoListAC} from "./todolists-reducer";


test('correct task should be removed', () => {
    // тестовые данные:
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "React Book", isDone: true}
        ]
    }
    // вызов тестируемой функции:
    const endState = tasksReducer(startState, removeTaskAC(todolistId2, "2"))
    // cверка результата c ожиданием:
    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
        ]
    });

});


test('correct task should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTaskTitle = "New Task";

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "React Book", isDone: true}
        ]
    }

    const endState = tasksReducer(startState, addTaskAC(todolistId2, newTaskTitle))

    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2][0].title).toBe(newTaskTitle);

});

test('correct task should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTaskTitle = "New Task 2";

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "React Book", isDone: true}
        ]
    }

    const endState = tasksReducer(startState, updateTaskTitleAC(todolistId2, "2", newTaskTitle));

    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: newTaskTitle, isDone: true}
        ]
    });
});

test('status of task should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: TasksStateType = {
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "React Book", isDone: true}
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, "2", false));

    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "React Book", isDone: false}
        ]
    });

});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = AddTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = RemoveTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
