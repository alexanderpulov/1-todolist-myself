import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const startTasks = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JavaScript", isDone: true},
        {id: 4, title: "React", isDone: false}
    ]

    const [tasks, setTasks] = useState(startTasks)
    const [filter, setFilter] = useState("all")

    const deleteTask = (id: number) => {
        const deletedTask = tasks.filter(t => t.id !== id)
        setTasks(deletedTask)
    }

    const changeFilter = (value: string) => {
        setFilter(value)
    }

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }



    return (
        <div className="App">
            <Todolist title={"Todolist"} tasks={filteredTasks} deleteTask={deleteTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
