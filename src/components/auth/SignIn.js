import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { isEmail } from "validator";

const initialState = {
    email: "",
    password: "",
    hidden: true,
    emailError: ""
    }

export default class SignIn extends Component {

    state = {
        email: "",
        password: "",
        hidden: true,
        emailError: ""
        }

        validate = () => {
            let emailError = "";

            if (!isEmail(this.state.email)){
                emailError = 'Email have to be valid'
            }
            
            if (emailError) {
                this.setState({emailError});
                return false;
            }

            return true;
        };

    onFormSubmit = async (e)=> {
        e.preventDefault();
        const isValid = this.validate();
        const {email, password} = this.state
        
        if (isValid) {
        try {
            await axios.post('http://localhost:3001/api/signin', {
                email,
                password,
            })
            console.log('password', password ) 
            } catch (error){
            return error;
            }

          this.setState(initialState)  
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                emailError: ""
            })   
        }
    }

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
      }

    redirectToSignUp() {
        //
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
                        />
                        <div style={{ fontSize: 10, color:"red" }} >
                           {this.state.emailError}
                        </div>
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
                <span> Dont have an accounct? </span>
                <Link to="/signup" >Sign Up</Link>
            </div>
        );
    }
}