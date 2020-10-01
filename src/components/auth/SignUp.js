import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        return (
            <div>
                <form>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange}

                    />
                    <br />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.onChange}

                    />
                    <br />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.onChange}

                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onFormSubmit}
                    >Submit</button>
                </form>
                <div>
                    <span>You have account</span>
                    <Link to="/login" >Login</Link>
                </div>
            </div>
        );
    }
}
