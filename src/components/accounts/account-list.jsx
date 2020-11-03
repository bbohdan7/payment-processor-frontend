import React from 'react'
import { Link } from 'react-router-dom';

import AccountService from '../../services/account.service';

export default class AccountList extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.fetchAccounts = this.fetchAccounts.bind(this);
        this.refreshAll = this.refreshAll.bind(this);
        this.setCurrentAccount = this.setCurrentAccount.bind(this);
        this.searchUser = this.searchUser.bind(this);

        this.state = {
            accounts: [],
            currentAccount: null,
            currentIndex: -1,
            searchUser: ""
        };
    }

    componentDidMount() {
        this.fetchAccounts();
    }

    onChangeSearchTitle(e) {
        const searchUser = e.target.value;

        this.setState({
            searchUser: searchUser
        });
    }

    fetchAccounts() {
        AccountService.all()
            .then(response => {
                this.setState({
                    accounts: response.data
                });
            })
            .catch(e => console.log(e));
    }

    refreshAll() {
        this.fetchAccounts();
        this.setState({
            currentAccount: null,
            currentIndex: -1
        });
    }

    setCurrentAccount(account, index) {
        this.setState({
            currentAccount: account,
            currentIndex: index
        });
    }

    searchUser() {
        AccountService.findByUser(this.state.searchUser, undefined)
            .then(response => {
                this.setState({
                    accounts: response.data
                });
            })
            .catch(err => console.log(err));
    }


    render() {
        const { searchUser, accounts, currentAccount, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input type="text"
                            className="form-control"
                            placeholder="Search by firstname"
                            value={searchUser}
                            onChange={this.onChangeSearchTitle} />
                        <button className="btn btn-outline-primary" onClick={this.searchUser}>Search</button>
                    </div>
                </div>

                <div className="col-md-6">
                    <h4>Account list</h4>

                    <table className="table table-striped table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Balance</th>
                                <th>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((acc, index) => (
                                <tr style={{ cursor: "pointer" }} key={index} className={(index === currentIndex ? "bg-danger" : "")} onClick={() => this.setCurrentAccount(acc, index)}>
                                    <td>{acc.id}</td>
                                    <td>{acc.balance}</td>
                                    <td>{`${acc.user.firstname} ${acc.user.lastname}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create New Account</h4>
                            <div className="card-text">
                                <Link to={"/add_account"} className="btn btn-outline-info">Create Account</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    {currentAccount ? (
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Account</h4>
                                <div>
                                    <label>
                                        <strong>Account ID: </strong>
                                    </label>{" "}
                                    {currentAccount.id}
                                </div>
                                <div>
                                    <label>
                                        <strong>Balance: </strong>
                                    </label>{" "}
                                    {currentAccount.balance}
                                </div>
                                <div>
                                    <label>
                                        <strong>Owner: </strong>
                                    </label>{" "}
                                    {`${currentAccount.user.firstname} ${currentAccount.user.lastname}`}
                                </div>
                                <div>
                                    <Link to={"/accounts/" + currentAccount.id} className="btn btn-success">
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
                                <p>Please, select an account</p>
                            </div>
                        )}
                </div>

            </div>
        );
    }
}