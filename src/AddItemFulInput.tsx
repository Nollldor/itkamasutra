import {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import React from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";

type AddItemFullInputPropsType = {
    itemID: string
    addItem: (itemID: string, title: string) => void
}

export const AddItemFullInput: FC<AddItemFullInputPropsType> = memo(({itemID, addItem}) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null);
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
            <TextField
                error={!!error}
                label="Title"
                helperText={error}
                size={"small"}
                variant="outlined"
                id="outlined-basic"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                /*className={error ? "error" : ""}*/
            />
            <IconButton size={"small"} onClick={addItemHandler}>
                <AddCircle/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
})