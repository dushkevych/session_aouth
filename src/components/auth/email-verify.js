import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class EmailVerify extends Component {
    
        state = {
            email: "",
            isEmailVerified: false,
            snackbarOpen: false,
            snackbarMessage: ""

    }

    //добавить валидацию формфы isEmail, not empty 
    onFormSubmit = async(e) => {
        e.preventDefault();
        const {email} = this.state
        try {
            const result = await axios.post('http://localhost:3001/api/email/verify', {
                email
            })
            const { message } = result.data;
            this.setState({
                snackbarOpen: true,
                snackbarMessage: message
            })
            
            console.log(message)
       
        } catch (error){
            return error;
        }
    }        
      
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClose = (e) => {
        this.setState({
            snackbarOpen: false,
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
                    
                    <Snackbar
                    anchorOrigin = {{vertical:'center', horizontal:'center'}}
                    open = { this.state.snackbarOpen }
                    autoHideDuration = {4000}
                    onClose = { this.handleClose }
                    message = { this.state.snackbarMessage }
                    action = {[
                        <IconButton
                        key = "close"
                        aria-label="close"
                        color="inherit"
                        onClick = {this.handleClose}
                        >
                        x
                        </IconButton>
                    ]}
                    />
     
                </Form>

               
           

            </div>
        );
    }
}
