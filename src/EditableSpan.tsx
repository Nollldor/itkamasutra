import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    editTitle: (title: string) => void
    className?: string
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        className,
        editTitle
    }) => {


    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const offEditMode = () => {
        setEditMode(false)
        editTitle(value)
    }
    const onEditMode = () => {

        setEditMode(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        setValue(e.currentTarget.value)
    }

    const onKeyEditTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            editTitle(title)
            offEditMode()
        }
    }

    return (editMode ?
            <input value={value} onChange={onChangeHandler} onKeyDown={onKeyEditTitle} onBlur={offEditMode} autoFocus/>
            : <span onDoubleClick={onEditMode} className={className}>{title}</span>
    )
}