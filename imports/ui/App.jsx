import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './Taskform.jsx';
import { LoginForm } from './LoginForm.jsx';
import { Meteor } from 'meteor/meteor';

const tasks = [
  { _id: 1, text: 'First Task' },
  { _id: 2, text: 'Second Task' },
  { _id: 3, text: 'Third Task' },
];

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const toggleChecked = Meteor.call('tasks.setIsChecked', _id, !isChecked);

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const tasks = useTracker(() =>
    TasksCollection.find( hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTasksCount = useTracker(() =>
  {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(hideCompletedFilter).count()

  }
  );

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;


  return (
    <div className='app'>
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
            {pendingTasksTitle}
          </div>
        </div>
      </header>

      <div className='main'>
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username || user.profile.name} 🚪
            </div>
            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}


