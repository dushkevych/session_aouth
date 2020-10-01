import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            username: "",
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

    redirectToSignUp() {
        //
    }

    render() {

        return (
            <div>
                <form>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
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
                    <span>Dont have a accounct?</span>
                    <Link to="/signup" >Sign Up</Link>
                </div>
            </div>
        );
    }
}
