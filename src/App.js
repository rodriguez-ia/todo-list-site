import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowExistingTasks() {
  return (
    <ul>
      <li>Features:</li>
      <li>Add new task with title and optional description</li>
      <li>View a list of all tasks with their defaults</li>
      <li>Mark tasks as complete or incomplete</li>
      <li>Edit/update exisiting tasks</li>
      <li>Delete tasks from the list</li>
      <li>Optional: Implement local storage to persist the tasks across sessions</li>
    </ul>
  );
}

function CreateNewTask() {
  return (
    <button>Create New Task</button>
  );
}

function App() {
  return (
    <div className="App">
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
      <h2>My Tasks</h2>
      <ShowExistingTasks />
      <CreateNewTask />
    </div>
  );
}

export default App;
