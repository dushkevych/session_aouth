import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

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
        const {email, firstName, lastName, password} = this.state
        console.log('after const declared', email);
        axios.post('http://localhost:3001/api/auth/signup', {
            email,
            firstName,
            lastName,
            password,
        })
        .then((result) => {
            console.log(result);
            console.log(result.data);
        });
    }
    
    
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        return (
            <div className="container">
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange}
                            className="md-col-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onFormSubmit}>
                        Submit
                    </Button>
                </Form>
                <div>
                    <span>You have account </span>
                    <Link to="/signin" >Sign In</Link>
                </div>
            </div>
        );
    }
}
