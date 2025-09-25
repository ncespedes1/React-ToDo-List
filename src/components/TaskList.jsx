import React, {use, useState} from 'react'

function TaskList() {

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = (e) => {
        e.preventDefault()
        if (newTask.trim()){
            setTasks(prevTasks => [
                ...prevTasks,
                {
                    id: crypto.randomUUID(),
                    name: newTask,
                    completed: false
                }
            ]);
            setNewTask('');
        }
    };

    const toggleCompleted = (id) => {
        setTasks(prevTasks =>
            prevTasks.map( task =>
                task.id === id ? {...task, completed: !task.completed} : task)
        );
    };

    const removeTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.filter( task =>
                task.id !== id)
        );
    };

    const clearCompleted = () => {
        setTasks(prevTasks =>
            prevTasks.filter(
                task => !task.completed)
        );
    };


  return (
    <>
        <div className="list-manager">
            <h1>ToDo List</h1>
            <form onSubmit={addTask}  id="taskForm">
                <input value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                type="text" id="taskInput" placeholder="What do we need?" required/>
                <button type="submit" id="addBtn" className="button">Add Task</button>
            </form>
        <ul id="taskList" className="task-list">
            {tasks.map(task=> (
                <li key={task.id} className={task.completed ? 'task-item completed' : 'task-item'}
                onClick={() => toggleCompleted(task.id)}
                style={{}} 
                        >
                    {/* check icon */}
                    <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                        {task.name}
                    </span>
                    <button onClick={() => removeTask(task.id)}
                        className='remove-btn'>Remove</button>
                </li>
            ))}
        </ul>
            <div id="listStats">
                <p>Total: <span id="totalCount">{tasks.length}</span> | 
                Completed: <span id="completedCount">{tasks.filter(task => task.completed).length}</span> | 
                Remaining: <span id="remainingCount">{tasks.filter(task => !task.completed).length}</span></p>
                <button onClick={clearCompleted}
                type="submit" id="clearCompleted" className="button">Clear Completed Tasks</button>
            </div>
        </div>
    </> 
  )
}

export default TaskList