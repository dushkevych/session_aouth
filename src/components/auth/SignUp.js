import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

export default class SignUp extends Component {
    
        state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            hidden: true,
    }

    onFormSubmit = async(e) => {
        e.preventDefault();
        const {email, firstName, lastName, password} = this.state
        try {
            await axios.post('http://localhost:3001/api/signup', {
                email,
                firstName,
                lastName,
                password,
            })
        } catch (error){
            return error;
        }
    }        
      
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
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
                            type={this.state.hidden ? 'password' : 'text'}
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            />
                        <Button
                            onClick={this.toggleShow}>
                            Show/Hide                                                     
                        </Button>                       
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
