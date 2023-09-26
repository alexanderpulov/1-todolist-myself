import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JavaScript", isDone: true},
        {id: 4, title: "React", isDone: false}
    ])

    const deleteTask = (id: number) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title={"Todolist"} tasks={tasks} deleteTask={deleteTask}/>
        </div>
    );
}

export default App;
