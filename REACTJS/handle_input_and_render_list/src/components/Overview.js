/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

const Overview = ({ tasks, deleteItem }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} id={task.id}>
          <div id="lis">
            {task.text}
            <i className="fas fa-ban" onClick={deleteItem} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Overview;
