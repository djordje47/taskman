import React from 'react';
import PropTypes from 'prop-types';
import SingleTask from "./SingleTask";

const TaskList = props => {
  const {tasks, markTaskAsCompleted} = props;
  return (
      <ul className="list-group mt-3">
        {tasks.map(task => (
            <SingleTask task={task} markTaskAsCompleted={markTaskAsCompleted} key={task.id}/>
        ))}
      </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(Object).isRequired,
  markTaskAsCompleted: PropTypes.func.isRequired,
};

export default TaskList;