import React, { Component, useState }  from 'react';
import logo from './logo.svg';
import './App.css';

function ShowTasksMenu({ existingTasks }) {
  const [count, setCount] = useState(0);

  function handleCreateNewTask() {
    existingTasks.push({title:'New Task', description:'I am a new task for you', id:count});
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
    <li key={task.id}>
      <input type="checkbox" />{' '}{task.title}
    </li>
  );
  
  return (
    <ul>
      <li><input type="checkbox" />{' '}Interview Prep</li>
      <li><input type="checkbox" />{' '}Sign Birthday Card</li>
      <li><input type="checkbox" />{' '}Shop for Groceries</li>
      <li><input type="checkbox" />{' '}Check in on family</li>
      <li><input type="checkbox" />{' '}Practice Guitar</li>
      <li><input type="checkbox" />{' '}Complete 1000 Piece Jigsaw Puzzle</li>
      {tasksToDisplay}
    </ul>
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
