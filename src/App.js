import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import GoogleSignin from './components/auth/google-signin';
import FacebookSignin from './components/auth/facebook-signin';
import EmailVerify from './components/auth/email-verify';
import  FormikForm from './components/auth/default-form';
import  FormExample from './components/auth/form-example';
//import TextValidator from './components/auth/text-validator'
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
        <li><Link to="/default-form">Default form</Link></li>
        <li><Link to="/form-example">Form Example</Link></li>

        <li>< GoogleSignin /> </li>
        <li>< FacebookSignin /> </li>
 
      </ul>
        <Switch >
          <Route exact path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/email/verify" component={EmailVerify} />
          <Route path="/default-form" component={FormikForm} />
          <Route path="/form-example" component={FormExample} />
        </Switch>
      </div>
    </Router>
    //</CookiesProvider>
  )
}
}
