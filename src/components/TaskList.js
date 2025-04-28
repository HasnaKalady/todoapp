import React, { useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, addTask, deleteTask, toggleCompleted }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = () => {
    if (!text.trim() || !dueDate.trim()) return;

    addTask({
      text,
      category,
      dueDate,
      completed: false,
    });

    setText('');
    setDueDate('');
  };

  return (
    <div>
      <div className="task-input">
        <input
          type="text"
          placeholder="New task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Work</option>
          <option>Home</option>
          <option>Uni</option>
          <option>Family</option>
          <option>Personal</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {tasks.map((task, i) => (
        <div
          key={i}
          className={`task ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(i)}
            />
            <span className={`task-text ${task.completed ? 'green-text' : ''}`}>
              {task.text}
            </span>
            <span className="category">[{task.category}]</span>
            <span className="due-date">Due: {task.dueDate}</span>
            {task.completed && <span className="completed-label">✅ Completed</span>}
          </div>

          <button className="delete-btn" onClick={() => deleteTask(i)}>🗑</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
