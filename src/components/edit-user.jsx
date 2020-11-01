import React from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import UserService from '../services/user.service';

export default class EditUser extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                firstname: "",
                lastname: "",
                email: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeFirstName(e) {
        const firstname = e.target.value;

        this.setState(prevState => {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    firstname: firstname
                }
            }
        });
    }

    onChangeLastName(e) {
        const lastname = e.target.value;

        this.setState(prevState => {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    lastname: lastname
                }
            }
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    email: email
                }
            }
        });
    }

    getUser(id) {
        UserService.find(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
            })
            .catch(e => console.log(e));
    }

    updateUser() {
        UserService.update(this.state.currentUser.id, this.state.currentUser)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "User has been successfully updated!"
                });
            })
            .catch(e => console.log(e));
    }

    deleteUser() {
        const history = createBrowserHistory();
        UserService.delete(this.state.currentUser.id)
            .then(response => {
                console.log("User has been removed");
                this.props.history.push("/users");
            })
            .catch(e => console.log(e));
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="row">
                <div className="col-md-4">
                    <Link to={"/users"} className="btn btn-primary">Back</Link>
                </div>
                <div className="col-md-4">
                    <h4>Editing User <u style={{ backgroundColor: "#3d70a6", color: "white", borderRadius: "25px", padding: "5px" }}>{`${currentUser.firstname} ${currentUser.lastname}`}</u></h4>

                    <form>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control" id="firstname" value={currentUser.firstname} onChange={this.onChangeFirstName} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control" id="lastname" value={currentUser.lastname} onChange={this.onChangeLastName} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Email</label>
                            <input type="email" className="form-control" id="email" value={currentUser.email} onChange={this.onChangeEmail} />
                        </div>

                        <div className="form-group">
                            <button type="button" onClick={this.updateUser} className="btn btn-success">Update</button>
                        </div>

                        <div className="form-group">
                            <button type="button" onClick={this.deleteUser} className="btn btn-danger">Delete</button>
                        </div>

                        {this.state.message.length > 0 ? (
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                <p>{this.state.message}</p>
                                <button type="button" className="close" data-dismiss="alert" aria-labels="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        ) : (<div></div>)}


                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}