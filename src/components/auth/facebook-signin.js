import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import GoogleLogin from 'react-google-login';
// import axios from 'axios';

// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function FacebookSignin() {

  return (
        <div>
            <a href='http://localhost:3001/api/facebook/login'>
                Login with Facebook
            </a>
        </div>
  )
}

export default FacebookSignin;