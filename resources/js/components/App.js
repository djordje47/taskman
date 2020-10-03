import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from "./Header";
import Projects from "./Projects";
import CreateProject from "./CreateProject";
import Project from "./Project";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Projects}/>
              <Route path='/create' component={CreateProject}/>
              <Route path='/:id' component={Project}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));