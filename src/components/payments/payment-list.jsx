import React from 'react'

import { Link } from 'react-router-dom'

import PaymentService from '../../services/payment.service';

export default class PaymentList extends React.Component {
    constructor(props) {
        super(props);

        this.fetchPayments = this.fetchPayments.bind(this);
        this.setCurrentPayment = this.setCurrentPayment.bind(this);
        this.refresh = this.refresh.bind(this);
        this.deletePayment = this.deletePayment.bind(this);

        this.state = {
            payments: [],
            currentPayment: null,
            currentIndex: -1
        }
    }

    componentDidMount() {
        this.fetchPayments();
    }

    fetchPayments() {
        PaymentService.all()
            .then(response => {
                this.setState({
                    payments: response.data
                })
            })
            .catch(err => console.log(err));
    }

    setCurrentPayment(payment, index) {
        this.setState({
            currentPayment: payment,
            currentIndex: index
        })
    }

    refresh() {
        this.fetchPayments();
        this.setState({
            currentPayment: null,
            currentIndex: -1
        })
    }

    deletePayment(){
        PaymentService.delete(this.state.currentPayment.id)
            .then(response => {
                window.alert(`${this.state.currentPayment.id} removed with status ${response.data}`);
                this.fetchPayments();
                this.refresh();
            })
            .catch(e => console.log(e));
    }

    render() {
        const { payments, currentPayment, currentIndex } = this.state;

        return (
            <div className="row">
                <div className="col-md-8">
                    <h4>Payment list</h4>

                    <table className="table table-striped table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Payer</th>
                                <th>Payer account</th>
                                <th>Payee</th>
                                <th>Payee account</th>
                                <th>Transaction datetime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={index} style={{ cursor: "pointer" }} className={(index === currentIndex ? "bg-danger" : "")} onClick={() => this.setCurrentPayment(payment, index)}>
                                    <td>{payment.id}</td>
                                    <td>{payment.amount}</td>
                                    <td>{`${payment.payer.firstname} ${payment.payer.lastname}`}</td>
                                    <td>{payment.payerAccount.id}</td>
                                    <td>{`${payment.payee.firstname} ${payment.payee.lastname}`}</td>
                                    <td>{payment.payeeAccount.id}</td>
                                    <td>{payment.transactionDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Make a Payment</h4>
                            <div className="card-text">
                                <Link to={"/make_payment"} className="btn btn-outline-info">Make Payment</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    {currentPayment ? (
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Payment information</h4><hr />

                                <h5 className="card-text">
                                    <span className="badge badge-danger">{`${currentPayment.payer.firstname} ${currentPayment.payer.lastname}`}</span>{" "}
                                    has sent <span className="badge badge-primary">{currentPayment.amount}</span>{" "}
                                    from their account #<span className="badge badge-success">{currentPayment.payerAccount.id}</span>{" "}
                                    to <span className="badge badge-danger">{`${currentPayment.payee.firstname} ${currentPayment.payee.lastname}`}</span>{" "}
                                    to account #<span className="badge badge-success">{currentPayment.payeeAccount.id}</span>{" "}
                                    at <span className="badge badge-warning">{currentPayment.transactionDate}</span>{" "}
                                </h5>

                                <div className="card-footer">
                                    <button type="button" className="btn btn-danger" onClick={this.deletePayment}>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>{" "}
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="alert alert-warning">
                                <p>Please, select a payment</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}