import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log('call')

    if (!text) return;

    try {
      TasksCollection.insert({
        text: text.trim(),
        createdAt: new Date()
      });
    } catch (err) {
      console.log(err)
    } 

    

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};