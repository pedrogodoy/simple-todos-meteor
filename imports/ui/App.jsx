import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './Taskform.jsx';

const tasks = [
  { _id: 1, text: 'First Task' },
  { _id: 2, text: 'Second Task' },
  { _id: 3, text: 'Third Task' },
];

const deleteTask = ({ _id }) => TasksCollection.remove(_id);
const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());


  return (
    <div className='app'>
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>

      <div className='main'>
        <TaskForm />

        <ul className="tasks">
          { tasks.map(task => <Task
            key={task._id}
            task={task}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />) }
        </ul>
      </div>
    </div>
  )
}


