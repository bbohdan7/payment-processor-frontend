import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import NewUser from './components/users/add-new-user';
import EditUser from './components/users/edit-user';
import UsersList from './components/users/users-list';
import NewAccount from './components/accounts/add-new-account';
import AccountList from './components/accounts/account-list';
import EditAccount from './components/accounts/edit-account';

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">PaymentProcessor</a>

          <div className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Users
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={"/users"} className="dropdown-item">Show All</Link>
                <Link to={"/add_user"} className="dropdown-item">Add New</Link>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownAccount" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Accounts
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownAccount">
                <Link to={"/accounts"} className="dropdown-item">Show All</Link>
                <Link to={"/add_account"} className="dropdown-item">Add New</Link>
              </div>
            </li>

          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={UsersList} />
            <Route path="/add_user" component={NewUser} />
            <Route path="/users/:id" component={EditUser} />
            <Route path="/add_account" component={NewAccount} />
            <Route exact path="/accounts" component={AccountList} />
            <Route path="/accounts/:id" component={EditAccount} />
          </Switch>
        </div>

      </div>
    );
  }
}