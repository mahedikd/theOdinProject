import React, { Component } from 'react';
import uniqid from 'uniqid';
import Overview from './components/Overview';

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: { text: '', id: uniqid() },
      tasks: [],
    };
  }

  handelChange = (e) => {
    const { task } = this.state;
    this.setState({
      task: {
        text: e.target.value,
        // eslint-disable-next-line react/destructuring-assignment
        // eslint-disable-next-line react/no-access-state-in-setstate
        id: task.id,
      },
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    const { task, tasks } = this.state;
    this.setState({
      tasks: tasks.concat(task),
      task: { text: '', id: uniqid() },
    });
  };

  deleteItem = (e) => {
    const { tasks } = this.state;
    const itemId = e.target.parentElement.parentElement.id;
    tasks.forEach((task, index) => {
      if (task.id === itemId) {
        tasks.splice(index, 1);
        this.setState({ tasks });
      }
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">
            Enter Task
            <input
              type="text"
              id="taskInput"
              onChange={this.handelChange}
              value={task.text}
            />
          </label>
          <button type="submit">Add Task</button>
        </form>
        <hr />
        <Overview tasks={tasks} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default App;
