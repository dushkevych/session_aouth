import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import GoogleLogin from 'react-google-login';
// import axios from 'axios';

// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function GoogleSignin() {

//   const responseSuccessGoogle = (response) => {
//     console.log(response)
//     axios( {
//       method: "POST",
//       url: "http://localhost:3001/api/google/login",
//       data: {tokenId: response.tokenId}
//     }).then(response => {
//       console.log('GOOGLE LOGIN SUCCESS', response);
//     })
//   }

//   const responseErrorGoogle = (response) => {
//     console.log(response)
// }

  return (
        <div>
         
            {/* <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login with GOOGLE"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
            /> */}

            <a href='http://localhost:3001/api/google/login'>
                Login with Google
            </a>
        </div>
  )
}

export default GoogleSignin;