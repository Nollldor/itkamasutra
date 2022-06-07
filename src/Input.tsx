import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "./components/Button";

type InputPropsType = {
    addMessage: (title: string) => void
}

export function Input(props: InputPropsType) {

    const [title, setTitle] = useState("")

    const onclickHandler = () => {
        props.addMessage(title)
        setTitle("")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onclickHandler()
        }
    }

    return (
        <div>
            <input onChange={onChangeHandler} value={title} onKeyPress={onKeyPressHandler}/>
            {/*<button onClick={onclickHandler}>+</button>*/}
            <Button title={"+"} callback={onclickHandler}/>
        </div>
    )
}