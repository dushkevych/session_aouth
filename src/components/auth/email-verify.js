import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import SimpleSnackbar from './snackbar'

export default class EmailVerify extends Component {
    
        state = {
            email: "",
            isEmailVerified: false

    }

    onFormSubmit = async(e) => {
        e.preventDefault();
        const {email} = this.state
        try {
            await axios.post('http://localhost:3001/api/email/verify', {
                email
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

    render() {
        return (
            <div className="container">
                <Form>
                    <Form.Group>
                        <Form.Label>Email Confirmation:</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange}
                            className="md-col-2"
                        />
                    </Form.Group>
                    
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onFormSubmit}>
                        Confirm Email
                    </Button>
                </Form>

                < SimpleSnackbar />

                

            </div>
        );
    }
}
