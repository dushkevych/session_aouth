import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
    constructor() {
        super()
        let loggedIn = false;
        this.state = {
            username: "",
            password: "",
            loggedIn
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault();

        if (this.state.username === "a" && this.state.password === "a") {
            localStorage.setItem("token", "valentyn")
            this.setState({ loggedIn: true })
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        if(this.state.loggedIn){
            return <Redirect to="/admin" />
        }
        return (
            <div>
                <form onSubmit={this.onFormSubmit} >
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
                    <input type='submit' />
                </form>
            </div>
        );
    }
}
