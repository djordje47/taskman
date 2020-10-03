import React from 'react';
import PropTypes from 'prop-types';

const SingleTask = props => {
  const {task, markTaskAsCompleted} = props;
  return (
      <li className="list-group-item d-flex justify-content-between align-items-center"
          key={task.id}>
        {task.title}
        <button
            className='btn btn-primary btn-sm'
            onClick={event => markTaskAsCompleted(task.id)}>
          Mark as completed
        </button>
      </li>
  );
};

SingleTask.propTypes = {
  task: PropTypes.object.isRequired,
  markTaskAsCompleted: PropTypes.func.isRequired,
};

export default SingleTask;