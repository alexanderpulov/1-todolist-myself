import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {
    const [items, setItems] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: false},
        {id: v1(), title: "React", isDone: true}
    ])

    const [filter, setFilter] = useState<FilterType>("all")

    // CALLBACKS ----------------------------------------------------
    const addItem = (inputValue: string) => {
        setItems([...items, {id: v1(), title: inputValue, isDone: false}])
    }

    const deleteItem = (id: string) => {
        const deletedItems = items.filter(i => i.id !== id)
        setItems(deletedItems)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        let item = items.find(i => i.id === id)
        if (item) {
            item.isDone = isDone
        }
        setItems([...items])
    }
    // END CALLBACKS ------------------------------------------------

    let filteredItems = items
    if(filter === "active") {
        filteredItems = items.filter(i => i.isDone === false)
    }
    if(filter === "completed") {
        filteredItems = items.filter(i => i.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title={"Todolist"}
                      items={filteredItems}
                      addItem={addItem}
                      deleteItem={deleteItem}
                      changeFilter={changeFilter}
                      changeStatus={changeStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;