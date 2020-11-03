import React from 'react';

import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom';

import UserService from '../../services/user.service'
import AccountService from '../../services/account.service'

export default class EditAccount extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeBalance = this.onChangeBalance.bind(this);
        this.onChangeOwner = this.onChangeOwner.bind(this);
        this.getAccount = this.getAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);

        this.state = {
            currentAccount: {
                id: null,
                balance: "",
                user: 0
            },
            message: "",
            allUsers: []
        };
    }

    componentDidMount() {
        this.getAccount(this.props.match.params.id);
        this.fetchAllUsers();
    }

    fetchAllUsers() {
        UserService.all()
            .then(response => {
                this.setState({
                    allUsers: response.data
                })
            })
            .catch(err => console.log(err));
    }

    onChangeBalance(e) {
        const balance = e.target.value;

        this.setState(prevState => {
            return {
                currentAccount: {
                    ...prevState.currentAccount,
                    balance: balance
                }
            }
        });
        console.log(this.state);
    }

    onChangeOwner(e) {
        const userId = e.target.value;

        console.log(`UserID ${userId}`);

        UserService.find(userId)
            .then(response => {
                this.setState(prevState => {
                    return {
                        currentAccount: {
                            ...prevState.currentAccount,
                            user: response.data
                        }
                    }
                });
            })
            .catch(e => console.log(e));
    }

    getAccount(id) {
        AccountService.find(id)
            .then(response => {
                this.setState({
                    currentAccount: response.data
                });
            })
            .catch(err => console.log(err));
    }

    updateAccount() {
        AccountService.update(this.state.currentAccount.id, this.state.currentAccount)
            .then(response => {
                console.log(response.data)
                this.setState({
                    message: "Account has been updated!"
                })
                console.log(this.state)
            })
            .catch(err => console.log(err));
    }

    deleteAccount() {
        const history = createBrowserHistory();

        AccountService.delete(this.state.currentAccount.id)
            .then(response => {
                this.props.history.push("/accounts");
            })
            .catch(err => console.log(err));
    }

    render() {
        const { currentAccount, allUsers } = this.state;

        return (
            <div className="row">
                <div className="col-md-4">
                    <Link to={"/accounts"} className="btn btn-primary">Back</Link>
                </div>

                <div className="col-md-4">
                    <h4>Editing Account <u>{`${currentAccount.id} wich belongs to ${currentAccount.user.firstname} ${currentAccount.user.lastname}`}</u></h4>

                    <form>
                        <div className="form-group">
                            <label htmlFor="balance">Balance</label>
                            <input className="form-control" name="balance" type="number" min="1" max="999999" value={currentAccount.balance} onChange={this.onChangeBalance} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="owner">Owner</label>
                            <select name="owner" id="owner" className="form-control" onChange={this.onChangeOwner} >
                                <option value={currentAccount.user.id}>{`${currentAccount.user.firstname} ${currentAccount.user.lastname}`}</option>
                                {allUsers.map((usr, index) => (
                                    <option key={index} value={usr.id}>{`${usr.firstname} ${usr.lastname}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-success" onClick={this.updateAccount}>Save</button>
                        </div>

                        <div className="form-group">
                            <button type="button" className="btn btn-danger" onClick={this.deleteAccount}>Delete</button>
                        </div>
                    </form>

                    {this.state.message !== "" ? (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <p>{this.state.message}</p>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ) : (<div></div>)}
                </div>
            </div>
        )
    }
}