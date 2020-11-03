import React from 'react'

import { Link } from 'react-router-dom'

import AccountService from '../../services/account.service'
import UserService from '../../services/user.service'

export default class NewAccount extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeBalance = this.onChangeBalance.bind(this);
        this.onChangeOwner = this.onChangeOwner.bind(this);
        this.saveAccount = this.saveAccount.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);

        this.state = {
            id: null,
            balance: 0,
            user: null,
            submitted: false,
            allUsers: []
        };
    }

    componentDidMount(){
        this.fetchAllUsers();
    }

    onChangeBalance(e) {
        this.setState({
            balance: e.target.value
        })
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

    onChangeOwner(e) {
        const userId = e.target.value

        UserService.find(userId)
            .then(response => {
                this.setState({
                    user: response.data
                })
            })
            .catch(err => console.log(err));
    }

    saveAccount() {
        let data = {
            balance: this.state.balance,
            user: this.state.user
        }

        AccountService.create(data)
            .then(response => {
                console.log(response)
                this.setState({
                    submitted: true
                })
            })
            .catch(err => console.log(err))
    }

    resetAll() {
        this.setState({
            id: null,
            balance: 0,
            user: null,
            submitted: false
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="submit-form">
                        <h2>Creating new account</h2><hr />
                        {this.state.submitted ? (
                            <div>
                                <h4>You've just created a new account</h4>
                                <Link to={"/accounts"} className="btn btn-outline-success">See all</Link>
                            </div>
                        ) : (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="balance">Balance: </label>
                                        <input id="balance" name="balance" className="form-control" type="number" min="0" max="999999" value={this.state.balance} onChange={this.onChangeBalance} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="owner">Owner: </label>
                                        <select name="users" id="users" className="form-control" onChange={this.onChangeOwner}>
                                            { this.state.allUsers.map((usr, index) => (
                                                <option key={index} value={usr.id}>{`${usr.firstname} ${usr.lastname}`}</option>
                                            )) }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <button type="button" className="btn btn-success" onClick={this.saveAccount} >Save</button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }
}