import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowTaskMenu() {
  return (
    <div className="App">
      <h2>My Tasks</h2>
      <ShowExistingTasks />
      <CreateNewTaskButton />
    </div>
  );
}

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

function CreateNewTaskButton() {
  function handleClick() {
    alert('Creating a new task.');
  }

  return (
    <button onClick={handleClick}>Create New Task</button>
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
  return <ShowTaskMenu />;
}

export default App;
