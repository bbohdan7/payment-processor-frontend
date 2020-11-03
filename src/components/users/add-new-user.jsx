import React from 'react'
import UserService from '../../services/user.service'

export default class NewUser extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.resetUser = this.resetUser.bind(this);

        this.state = {
            id: null,
            firstname: "",
            lastname: "",
            email: "",
            submitted: false
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    saveUser() {
        let data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email
        };

        UserService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,

                    submitted: true
                })
            })
            .catch(e => console.log(e));
    }

    resetUser() {
        this.setState({
            id: null,
            firstname: "",
            lastname: "",
            email: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="submit-form">
                        <h2>Adding new user</h2>
                        <hr />
                        {this.state.submitted ? (
                            <div>
                                <h4>You've submitted successfully!</h4>
                                <button className="btn btn-success" onClick={this.NewUser}>Create</button>
                            </div>
                        ) : (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="firstname">First Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="firstname"
                                            value={this.state.firstname}
                                            onChange={this.onChangeFirstName}
                                            name="firstname"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">Last Name</label>
                                        <input type="text"
                                            className="form-control"
                                            id="lastname"
                                            value={this.state.lastname}
                                            onChange={this.onChangeLastName}
                                            name="lastname"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            name="email"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" onClick={this.saveUser} className="btn btn-success">Create</button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}