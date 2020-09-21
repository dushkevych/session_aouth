import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from './components/Login';

function App() {

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/" >Dashboard</Link>

          </li>
          <li>
            <Link to="/login" >Login</Link>
          </li>
        </ul>
        <Switch >
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )

}

export default App;