import React from "react";

type ButtonPropsType = {
    title: string
    callback: () => void
}

export const Button = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        props.callback()
    }


    return (
        <button onClick={onClickHandler}>{props.title}</button>
    )
}