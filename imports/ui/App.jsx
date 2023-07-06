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

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };


  return (
    <div>
      <h1>Welcome to meteor</h1>

      <TaskForm />

      <ul>
        {tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} />)}
      </ul>
    </div>
  )
}

