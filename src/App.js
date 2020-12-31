import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import GoogleSignin from './components/auth/google-signin';
import FacebookSignin from './components/auth/facebook-signin'
import EmailVerify from './components/auth/email-verify'
import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    < CookiesProvider >
    <Router>
      <div>
      
      <ul>
        <li>< GoogleSignin /> </li>
        <li>< FacebookSignin /> </li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/email/verify">Confirm Email</Link></li>

      </ul>
        <Switch >
          <Route exact path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/email/verify" component={EmailVerify} />
        </Switch>
      </div>
    </Router>
    </CookiesProvider>
  )

}

export default App;