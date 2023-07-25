import React, { Component, useState, useRef }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowTasksMenu({ existingTasks }) {
  const [nextId, setNextId] = useState(0);
  const [tasksList, setTasksList] = useState(existingTasks);

  function handleCreateNewTask() {
    setTasksList(tasksList.concat([{title:'[Task Name]', description:'I am a new task for you', id:nextId}]));
    setNextId(nextId + 1);
  }

  function handleDeleteTask(taskId) {
    setTasksList(tasksList.filter(task => task.id !== taskId));
  }

  return (
    <div className="tasks-menu">
      <h2 className='tasks-label'>My Tasks</h2>
      <ShowExistingTasks existingTasks={tasksList} onDeleteTask={handleDeleteTask} />
      <CreateNewTaskButton onClick={handleCreateNewTask} />
    </div>
  );
}

function ShowExistingTasks({ existingTasks, onDeleteTask }) {
  const tasksToDisplay = existingTasks.map(task =>
    <TaskItem key={task.id} taskId={task.id} taskTitle={task.title} onDeleteTask={onDeleteTask} />
  );
  
  return (
    <ul>
      <TaskItem key="90" taskTitle="Interview Prep" onDeleteTask={onDeleteTask} />
      <TaskItem key="91" taskTitle="Sign Birthday Card" onDeleteTask={onDeleteTask} />
      <TaskItem key="92" taskTitle="Shop for Groceries" onDeleteTask={onDeleteTask} />
      <TaskItem key="93" taskTitle="Check in on family" onDeleteTask={onDeleteTask} />
      <TaskItem key="94" taskTitle="Practice Guitar" onDeleteTask={onDeleteTask} />
      <TaskItem key="95" taskTitle="Complete 1000 Piece Jigsaw Puzzle" onDeleteTask={onDeleteTask} />
      {tasksToDisplay}
    </ul>
  );
}

function TaskItem({ taskId, taskTitle, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(taskTitle);
  const textBoxRef = useRef(null);

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

  return (
    <li>
      <input type="checkbox"
             disabled={isEditing}
      />  {' '}
          {isEditing ? (
            <input type="text"
                   value={editedText}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   autoFocus
            />
          ) : (
            <span onClick={handleEdit}>
              {editedText}
              <button onClick={() => onDeleteTask(taskId)}
                      disabled={isEditing}
                      ref={textBoxRef}>
                        {' '}Delete
              </button>
            </span>
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
