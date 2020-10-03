import React, {useState} from 'react';
import axios from "axios";

const CreateProject = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  /**
   * Creates a project
   * @param event
   */
  const createNewProject = event => {
    event.preventDefault();
    const {history} = props;
    axios.post('/api/projects', {
      name,
      description
    }).then(response => {
      history.push('/');
    }).catch(error => {
      setErrors(error.response.data.errors);
    });
  };

  /**
   * Checks for errors
   * @param field
   * @returns {boolean}
   */
  const hasErrorFor = field => {
    return !!errors[field];
  }

  /**
   * Renders the error on the field.
   * @param field
   * @returns {JSX.Element}
   */
  const renderErrorFor = field => {
    if (hasErrorFor(field)) {
      return (
          <span className="invalid-feedback">
            <strong>{errors[field][0]}</strong>
          </span>
      );
    }
  }

  return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Create new project
              </div>
              <div className="card-body">
                <form onSubmit={createNewProject}>
                  <div className="form-group">
                    <label htmlFor="name">Project</label>
                    <input type="text"
                           id="name"
                           name="name"
                           autoComplete="off"
                           value={name}
                           onChange={event => setName(event.target.value)}
                           className={`form-control ${hasErrorFor('name') ? 'is-invalid' : ''}`}/>
                    {renderErrorFor('name')}
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Project description</label>
                    <textarea
                        id="description"
                        className={`form-control ${hasErrorFor('description') ? 'is-invalid' : ''}`}
                        name="description"
                        rows="10"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    {renderErrorFor('description')}
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default CreateProject;