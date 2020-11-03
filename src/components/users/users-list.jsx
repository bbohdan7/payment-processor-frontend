import React from 'react'
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service'

export default class UsersList extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    onChangeSearchTitle(e) {
        const searchText = e.target.value;

        this.setState({
            searchTitle: searchText
        });
    }

    fetchUsers() {
        UserService.all()
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    refreshAll() {
        this.fetchUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }

    setCurrentUser(user, index) {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
    }

    searchTitle() {
        UserService.findByFullName(this.state.searchTitle, undefined)
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, users, currentUser, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search by first name" value={searchTitle} onChange={this.onChangeSearchTitle} />
                        <button className="btn btn-outline-primary" onClick={this.searchTitle}>Search</button>
                    </div>
                </div>

                <div className="col-md-6">
                    <h4>Users list</h4>

                    <ul className="list-group">
                        {users && users.map((user, index) => (
                            <li style={{ cursor: "pointer" }} className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => this.setCurrentUser(user, index)}
                                key={index}>{`${user.firstname} ${user.lastname}`}</li>
                        ))}
                    </ul>

                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create new User</h4>
                            <div className="card-text">
                                <Link to={"/add_user"} className="btn btn-outline-info">Create User</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    {currentUser ? (
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">User</h4>
                                <div>
                                    <label>
                                        <strong>First Name: </strong>
                                    </label>{" "}
                                    {currentUser.firstname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Last Name: </strong>
                                    </label>{" "}
                                    {currentUser.lastname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Email: </strong>
                                    </label>{" "}
                                    {currentUser.email}
                                </div>
                                <div>
                                    <Link to={"/users/" + currentUser.id} className="btn btn-success">
                                        Edit 
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="alert alert-warning">
                                <p>Please, select a user</p>
                            </div>
                        )}
                </div>

            </div>
        );
    }
}