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

  let existingTasks = [{title:'Interview Prep', description:'Prep for job interview.', id:"90"},
                       {title:'Sign Birthday Card', description:'Sign a card for your friend.', id:"91"},
                       {title:'Shop for Groceries', description:'Get bacon, eggs, and milk.', id:"92"},
                       {title:'Check in on family', description:'See how they are all doing.', id:"93"},
                       {title:'Practice Guitar', description:'Learn some new riffs.', id:"94"},
                       {title:'Complete 1000 Piece Jigsaw Puzzle', description:'It has been sitting there for a while...', id:"95"}];

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
