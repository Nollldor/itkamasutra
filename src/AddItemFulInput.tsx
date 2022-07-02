import {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import React from "react";

type AddItemFullInputPropsType = {
    itemID: string
    addItem: (itemID: string, title: string) => void
}

export const AddItemFullInput: FC<AddItemFullInputPropsType> = ({itemID, addItem}) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addItemHandler();
        }
    }

    const addItemHandler = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addItem(itemID, newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (

        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}