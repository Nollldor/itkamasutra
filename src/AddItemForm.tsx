import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddItem}>+</button>
            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    )
}