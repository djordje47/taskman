import React, {Component} from 'react';
import axios from "axios";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.createNewProject = this.createNewProject.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  render() {
    return (
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  Create new project
                </div>
                <div className="card-body">
                  <form onSubmit={this.createNewProject}>
                    <div className="form-group">
                      <label htmlFor="name">Project</label>
                      <input type="text"
                             id="name"
                             name="name"
                             autoComplete="off"
                             value={this.state.name}
                             onChange={this.handleFieldChange}
                             className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}/>
                      {this.renderErrorFor('name')}
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Project description</label>
                      <textarea
                          id="description"
                          className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                          name="description"
                          rows="10"
                          value={this.state.description}
                          onChange={this.handleFieldChange}
                      />
                      {this.renderErrorFor('description')}
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

  /**
   * @param event
   */
  createNewProject(event) {
    event.preventDefault();
    const {history} = this.props;
    const project = {
      name: this.state.name,
      description: this.state.description
    }
    axios.post('/api/projects', project).then(response => {
      history.push('/');
    }).catch(error => {
      this.setState({
        errors: error.response.data.errors
      });
    });
  }

  /**
   * @param field
   * @returns {boolean}
   */
  hasErrorFor(field) {
    return !!this.state.errors[field];
  }

  /**
   * @param event
   */
  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *
   * @param field
   * @returns {JSX.Element}
   */
  renderErrorFor(field) {
    if (this.hasErrorFor(field)) {
      return (
          <span className="invalid-feedback">
            <strong>{this.state.errors[field][0]}</strong>
          </span>
      );
    }
  }
}

export default CreateProject;