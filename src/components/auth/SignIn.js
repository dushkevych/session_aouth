import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class SignIn extends Component {

    state = {
        email: "",
        password: "",
        }

    onFormSubmit = async (e)=> {
        e.preventDefault();
        const {email, password} = this.state
        try {
            await axios.post('http://localhost:3001/api/signin', {
                email,
                password,
            })
            console.log('password', password ) 
            } catch (error){
            return error;
            }
    }
    onChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange} />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onFormSubmit}>
                        Submit
                    </Button>
                </Form>
                <span> Dont have a accounct? </span>
                <Link to="/signup" >Sign Up</Link>
            </div>
        );
    }
}
