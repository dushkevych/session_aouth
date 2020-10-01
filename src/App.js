import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

function App() {

  return (
    <Router> 
      <div>
        <Switch >
          <Route exact path="/login" component={Login} />
          
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  )

}

export default App;