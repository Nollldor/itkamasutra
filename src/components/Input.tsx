import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    title: string
    callback: (title: string) => void
    callbackKey: (key: string) => void
}

export const Input = (props: InputPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.callbackKey(e.key)
    }
    return (
        <input value={props.title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
    );
};

