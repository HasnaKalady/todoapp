import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const filteredTasks = tasks
    .filter(task => filter === 'All' || task.category === filter)
    .filter(task => task.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <Sidebar filter={filter} setFilter={setFilter} />
      <div className="main">
        <h1>To-Do List</h1>

        <input
          className="search"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <TaskList
          tasks={filteredTasks}
          addTask={addTask}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />

        <p className="pending">
          Pending Tasks: {tasks.filter(t => !t.completed).length}
        </p>
      </div>
    </div>
  );
}

export default App;
