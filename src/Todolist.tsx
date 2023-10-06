import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {logDOM} from "@testing-library/react";
import {FilterType} from "./App";

type ItemsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    items: Array<ItemsType>
    addItem: (inputValue: string) => void
    deleteItem: (id: string) => void
    changeFilter: (value: FilterType) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: string
}

export const Todolist = (props: TodolistType) => {
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState<null | string>(null)

    const addItemHandler = () => {
        if (inputValue.trim() !== "") {
            props.addItem(inputValue)
            setInputValue("")
        } else {
            setError("Field is required")
        }

    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (inputValue.trim() !== "") {
                props.addItem(inputValue.trim())
                setInputValue("")
            } else {
                setError("Field is required")
            }
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const changeAllFilterHandler = () => {
        props.changeFilter("all")
    }
    const changeActiveFilterHandler = () => {
        props.changeFilter("active")
    }
    const changeCompletedFilterHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input value={inputValue}
                       className={error ? "error" : ""}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addItemHandler}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.items.map(i => {
                    const deleteItemHandler = () => {
                        props.deleteItem(i.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(i.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={i.id} className={i.isDone ? "is-done" : ""}>
                            <input onChange={onChangeStatusHandler}
                                   type="checkbox"
                                   checked={i.isDone}/>
                            <span>{i.title}</span>
                            <button onClick={deleteItemHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={changeAllFilterHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={changeActiveFilterHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={changeCompletedFilterHandler}>Completed
                </button>
            </div>
        </div>
    );
};
