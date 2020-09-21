import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Admin extends Component {
    constructor(){
        super();
        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            this.setState({loggedIn: false})
        }

        this.state = {
            loggedIn
        }
    }
        render(){
            if(this.state.loggedIn === false){
                return <Redirect to="/" />
            }
            return(
                <div>
                    <h2>Only logged in can see this page!</h2>
                    <Link to="/logout">Logout</Link>
                </div>
            )
        }
}