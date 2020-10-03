import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get('/api/projects').then(response => {
      setProjects(response.data);
    });
  }, []);
  return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">All projects</div>
              <div className="card-body">
                <Link to='/create' className="btn btn-primary btn-sm mb-3">
                  Create new project
                </Link>
                <ul className="list-group list-group-flush">
                  {projects.map(project => (
                      <Fragment key={project.id}>
                        <Link to={`/${project.id}`}
                              className="d-flex flex-row justify-content-between align-content-center align-items-center">
                          {project.name}
                          <span className="badge badge-primary badge-pill">
                            {project.tasks_count}
                          </span>
                        </Link>
                        <small className="text-muted">{project.description}</small>
                      </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Projects;