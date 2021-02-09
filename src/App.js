import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import GoogleSignin from './components/auth/google-signin';
import FacebookSignin from './components/auth/facebook-signin';
import EmailVerify from './components/auth/email-verify';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  
  render () {
  return (
    //< CookiesProvider >
    <Router>
      <div>
      
      <ul>       
       
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/email/verify">Confirm Email</Link></li>

        <li>< GoogleSignin /> </li>
        <li>< FacebookSignin /> </li>
 
      </ul>
        <Switch >
          <Route exact path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/email/verify" component={EmailVerify} />
        </Switch>
      </div>
    </Router>
    //</CookiesProvider>
  )
}
}
