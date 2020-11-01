import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import NewUser from './components/add-new-user';
import EditUser from './components/edit-user';
import UsersList from './components/users-list';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">PaymentProcessor</a>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">Add</Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UsersList} />
            <Route exact path={"/add"} component={NewUser} />
            <Route path="/users/:id" component={EditUser} />
          </Switch>
        </div>

      </div>
    );
  }
}