import React, { Component, useState, useRef }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowTasksMenu({ existingTasks }) {
  const [count, setCount] = useState(0);

  function handleCreateNewTask() {
    existingTasks.push({title:'[Task Name]', description:'I am a new task for you', id:count});
    setCount(count + 1);
  }

  return (
    <div className="tasks-menu">
      <h2 className='tasks-label'>My Tasks</h2>
      <ShowExistingTasks existingTasks={existingTasks} />
      <CreateNewTaskButton onClick={handleCreateNewTask} />
    </div>
  );
}

function ShowExistingTasks({ existingTasks }) {
  const tasksToDisplay = existingTasks.map(task =>
    <TaskItem key={task.id} taskTitle={task.title} />
  );
  
  return (
    <ul>
      <TaskItem key="90" taskTitle="Interview Prep" />
      <TaskItem key="91" taskTitle="Sign Birthday Card" />
      <TaskItem key="92" taskTitle="Shop for Groceries" />
      <TaskItem key="93" taskTitle="Check in on family" />
      <TaskItem key="94" taskTitle="Practice Guitar" />
      <TaskItem key="95" taskTitle="Complete 1000 Piece Jigsaw Puzzle" />
      {tasksToDisplay}
    </ul>
  );
}

function TaskItem({ taskTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(taskTitle);
  const inputRef = useRef(null);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  function handleChange(event) {
    taskTitle = event.target.value
    setEditedText(event.target.value);
  }

  function handleCheckboxClick(event) {
    event.stopPropagation();
  }

  function handleLiClick(event) {
    if (!isEditing && event.target === inputRef.current) {
      setIsEditing(true);
    }
  }

  return (
    <li onClick={handleLiClick}>
      <input type="checkbox"
            onClick={handleCheckboxClick}
            disabled={isEditing}
      />  {' '}
          {isEditing ? (
            <input type="text"
                   value={editedText}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   ref={inputRef}
                   autoFocus
            />
          ) : (
            <span onClick={handleEdit}>{editedText}</span>
          )}
    </li>
  );
}

function CreateNewTaskButton({ onClick }) {
  return (
    <button className='new-task-button' onClick={onClick}>Create New Task</button>
  );
}

function App() {
  let currentDate = new Date();
  let dd = String(currentDate.getDate()).padStart(2, '0');
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  let yyyy = currentDate.getFullYear();
  
  currentDate = mm + '/' + dd + '/' + yyyy;

  let existingTasks = [];

  return (
    <div>
      <div className='navbar'>
        <h2 className='navbar-items'>
          {currentDate}
        </h2>
      </div>
      <ShowTasksMenu existingTasks={existingTasks} />
    </div>
  );
}

export default App;
