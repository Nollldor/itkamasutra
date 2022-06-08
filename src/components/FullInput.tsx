import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type ButtonPropsType = {
    addTask: (title: string) => void
}
export const FullInput = (props: ButtonPropsType) => {

    let [title, setTitle] = useState("")

    const addTask = () => {
        if (title !== "") {
            props.addTask(title);
            setTitle("");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onClickHandler = () => {
        if (title !== "") {
            props.addTask(title)
            setTitle("")
        }

    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />

            {/*<Button title={"+"} callback={addTask}/>*/}
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}