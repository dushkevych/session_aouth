import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Admin from './components/Admin';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {

  return (
    <Router>
      <div>
        <Switch >
          <Route exact path="/" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  )

}

export default App;