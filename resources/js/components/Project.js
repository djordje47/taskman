import React, {useState, useEffect} from 'react';
import axios from 'axios'
import TaskList from "./tasks/TaskList";

const Project = (props) => {
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const projectId = props.match.params.id;
    axios.get(`/api/projects/${projectId}`).then(response => {
      setProject(response.data);
      setTasks(response.data.tasks);
    });
  }, []);

  /**
   * Marks project as completed
   */
  const markProjectAsCompleted = () => {
    const {history} = props
    axios.put(`/api/projects/${project.id}`).then(response => history.push('/'))
  }

  /**
   * Adds new task
   * @param event
   */
  const handleAddNewTask = event => {
    event.preventDefault()
    axios.post('/api/tasks', {
      title,
      project_id: project.id
    })
    .then(response => {
      setTitle('');
      setTasks([...tasks, response.data]);
    })
    .catch(error => {
      setErrors(error.response.data.errors);
    })
  }

  /**
   * Checks for errors
   * @param field
   * @returns {boolean}
   */
  const hasErrorFor = field => {
    return !!errors[field]
  }
  /**
   * Renders the errors
   * @param field
   * @returns {JSX.Element}
   */
  const renderErrorFor = field => {
    if (hasErrorFor(field)) {
      return (
          <span className='invalid-feedback'>
            <strong>{errors[field][0]}</strong>
          </span>
      )
    }
  }

  /**
   * Marks task as completed
   * @param taskId
   */
  const handleMarkTaskAsCompleted = taskId => {
    axios.put(`/api/tasks/${taskId}`).then(response => {
      setTasks(tasks.filter(task => {
        return task.id !== taskId
      }));
    });
  }

  return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                {project.name}
              </div>
              <div className="card-body">
                <p>{project.description}</p>
                <button className="btn btn-primary btn-sm" onClick={markProjectAsCompleted}>
                  Mark as completed
                </button>
                <hr/>
                <form onSubmit={handleAddNewTask}>
                  <div className="input-group">
                    <input
                        type="text"
                        name="title"
                        className={`form-control ${hasErrorFor('title') ? 'is-invalid' : ''}`}
                        placeholder="Task title"
                        autoComplete="off"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <div className='input-group-append'>
                      <button className='btn btn-primary'>Add</button>
                    </div>
                    {renderErrorFor('title')}
                  </div>
                </form>
                <TaskList tasks={tasks} markTaskAsCompleted={handleMarkTaskAsCompleted}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Project;