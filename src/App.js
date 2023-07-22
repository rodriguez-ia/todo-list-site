import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowTasksMenu() {
  return (
    <div className="tasks-menu">
      <h2 className='tasks-label'>My Tasks</h2>
      <ShowExistingTasks />
      <CreateNewTaskButton />
    </div>
  );
}

function ShowExistingTasks() {
  return (
    <ul>
      <li><input type="checkbox" />{' '}Add new task with title and optional description</li>
      <li><input type="checkbox" />{' '}View a list of all tasks with their defaults</li>
      <li><input type="checkbox" />{' '}Mark tasks as complete or incomplete</li>
      <li><input type="checkbox" />{' '}Edit/update exisiting tasks</li>
      <li><input type="checkbox" />{' '}Delete tasks from the list</li>
      <li><input type="checkbox" />{' '}Optional: Implement local storage to persist the tasks across sessions</li>
    </ul>
  );
}

function CreateNewTaskButton() {
  function handleClick() {
    alert('Creating a new task.');
  }

  return (
    <button className='new-task-button' onClick={handleClick}>Create New Task</button>
  );
}

function App() {
  /*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  */
  let currentDate = new Date();
  let dd = String(currentDate.getDate()).padStart(2, '0');
  let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  let yyyy = currentDate.getFullYear();
  
  currentDate = mm + '/' + dd + '/' + yyyy;

  return (
    <div>
      <div className='navbar'>
        <h2 className='navbar-items'>
          {currentDate}
        </h2>
      </div>
      <ShowTasksMenu />
    </div>
  );
}

export default App;
