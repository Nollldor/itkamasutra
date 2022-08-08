import {ChangeEvent, FC, memo, useState} from "react";
import React from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    updateTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({title, updateTitle}) => {

    const [editMode, setEditMode] = useState(false)
    const [titleES, setTitleES] = useState(title)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        updateTitle(titleES)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleES(e.currentTarget.value)
    }

    return (
        !editMode ? <span onDoubleClick={onEditMode}>{titleES}</span>
            : <TextField
                size={"small"}
                variant="outlined"
                id="outlined-basic"
                value={titleES}
                onChange={onChangeHandler}
                onBlur={offEditMode}
            />
    )
})