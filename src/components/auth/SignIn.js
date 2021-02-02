import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { isEmail, isEmpty, isLength } from "validator";

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
            let passwordError = "";

            if (isEmpty(this.state.email)){
                emailError = 'E-mail is required*'
            };

            if (!isEmail(this.state.email)){
                emailError = 'Valid e-mail is required*'
            };

            if (!isEmpty(this.state.password)){
                passwordError = 'Password is required*'
            };

            if (!isLength({ min: 8 })){
                passwordError = 'password must be at least 8 characters long*'
            };

    //   .isLength({ min: 8 }).withMessage('password must be 8 characters')
    //   //password must be at least 8 characters long, contain uppercase letters, lowercase letters, numbers, can contain special characters
    //   .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    //   .trim().escape()
    //   .withMessage('password must be at least 8 characters long, contain UPPERCASE LETTERS, lowercase letters, numbers, can contain special characters')

            if (emailError || passwordError) {
                this.setState({emailError, passwordError});
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
    onChangeEmail = (e) => {
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

    onChangePassword = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        const isValid = this.validate();
        
        if (isValid) {
            this.setState({
                passwordError: ""
            })   
        }
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
                            onChange={this.onChangeEmail}
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
                            onChange={this.onChangePassword}
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