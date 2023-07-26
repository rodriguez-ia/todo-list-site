import React, { Component, useState, useRef, useEffect }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowTasksMenu({ nextTaskId, existingTasks }) {
  const [nextId, setNextId] = useState(nextTaskId);
  const [tasksList, setTasksList] = useState(existingTasks);

  useEffect(() => {
    window.localStorage.setItem('tasksList', JSON.stringify(tasksList));
    window.localStorage.setItem('nextId', nextId.toString());
  }, [tasksList, nextId]);

  function handleCreateNewTask(newTaskInputRef) {
    if (newTaskInputRef.current.checkValidity()) {
      const newTaskName = newTaskInputRef.current.value;
      newTaskInputRef.current.value = '';

      setTasksList(tasksList.concat([{title:newTaskName, description:'I am a new task for you', isComplete:false, id:nextId}]));
      setNextId(nextId + 1);
    } else {
      newTaskInputRef.current.reportValidity();
    }
  }

  function handleDeleteTask(taskId) {
    setTasksList(tasksList.filter(task => task.id !== taskId));
  }

  function handleEditTask(taskId, editedText) {
    setTasksList(tasksList.map(task => (task.id === taskId ? {...task, title: editedText} : task)));
  }

  function handleClickCheckbox(taskId, isChecked) {
    setTasksList(tasksList.map(task => (task.id === taskId ? {...task, isComplete: isChecked} : task)));
  }

  return (
    <div className="tasks-container">
      <div className="tasks-menu">
        <div className="tasks-label">Tasks to Complete:</div>
        <ShowExistingTasks existingTasks={tasksList}
                          onDeleteTask={handleDeleteTask}
                          onEditTask={handleEditTask}
                          onClickTaskCheckbox={handleClickCheckbox} />
        <CreateNewTask onCreateNewTask={handleCreateNewTask} />
      </div>
    </div>
  );
}

function ShowExistingTasks({ existingTasks, onDeleteTask, onEditTask, onClickTaskCheckbox }) {
  const tasksToDisplay = existingTasks.map(task =>
    <TaskItem key={task.id}
              taskTitle={task.title}
              isTaskComplete={task.isComplete}
              taskId={task.id}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onClickTaskCheckbox={onClickTaskCheckbox} />
  );
  
  return (
    <div className="task-list">
      <ul>{tasksToDisplay}</ul>
    </div>
  );
}

function TaskItem({ taskTitle, isTaskComplete, taskId, onDeleteTask, onEditTask, onClickTaskCheckbox }) {
  const [isChecked, setIsChecked] = useState(isTaskComplete);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(taskTitle);
  const textBoxRef = useRef(null);

  useEffect(() => {
    onClickTaskCheckbox(taskId, isChecked);
  }, [isChecked]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
    onEditTask(taskId, editedText);
  }

  function handleChange(event) {
    setEditedText(event.target.value);
  }

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  return (
    <li>
      <div className='checkbox-container' onClick={handleCheckboxClick}>
        <input type="checkbox"
               checked={isChecked}
               disabled={isEditing}
        />
        <span className="task-checkbox"></span>
      </div>
          {isEditing ? (
            <input type="text"
                   value={editedText}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   autoFocus
            />
          ) : (
            <>
              <span className="task-text" onClick={handleEdit}>
                {editedText}
              </span>
              <button className="delete-button"
                      onClick={() => onDeleteTask(taskId)}
                      disabled={isEditing}
                      ref={textBoxRef}>
                        Delete
              </button>
            </>
          )}
    </li>
  );
}

function CreateNewTask({ onCreateNewTask }) {
  const newTaskInputRef = useRef(null);

  return (
    <div>
      <input type="text"
             className="new-task-input"
             placeholder="Enter new task here..."
             ref={newTaskInputRef}
             required></input>
      <button className='new-task-button' onClick={() => onCreateNewTask(newTaskInputRef)}>Create New Task</button>
    </div>
  );
}

function App() {
  let currentDate = new Date();
  let dd = String(currentDate.getDate()).padStart(2, '0');
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  let yyyy = currentDate.getFullYear();
  
  currentDate = mm + '/' + dd + '/' + yyyy;

  let localStorageId = window.localStorage.getItem('nextId');
  let nextTaskId = localStorageId ? Number(localStorageId) : 0;

  let localStorageExistingTasks = window.localStorage.getItem('tasksList');
  let existingTasks = localStorageExistingTasks ? JSON.parse(localStorageExistingTasks) : [];

  return (
    <div>
      <div className="navbar">
        <img src="/apple-touch-icon.png"
             className="clipboard-img"
             align="left"
             alt="Clipboard">
        </img>
        <div className="navbar-items">
          <div className="navbar-title">
            To-Do List
          </div>
          <div className="navbar-date">
            {currentDate}
          </div>
        </div>
      </div>
      <ShowTasksMenu nextTaskId={nextTaskId} existingTasks={existingTasks} />
      <div className="footer">
        <div className="footer-text">
          A simple ToDo list that keeps track of a user's tasks and allows them to update their progress as they complete their tasks.
        </div>
      </div>
    </div>
  );
}

export default App;
