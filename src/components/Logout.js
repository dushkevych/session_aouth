import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Logout extends Component {
    render(){
        return(
            <div>
                <h2>You have been logged out</h2>
                <Link to="/" >Login</Link>
            </div>
        )
    }
}
