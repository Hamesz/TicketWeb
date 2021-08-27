// import React from "react";
// // imports for login screen
// import Amplify from "aws-amplify"
// import awsconfig from "./aws-exports"
// import {AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react"

// Amplify.configure(awsconfig)

// // function App() {
// //   return (
// //     <div className="App">
// //         {/* <AmplifySignOut /> */}
// //         <h2>My App Content</h2>
// //     </div>
// //   );
// // }

// export default withAuthenticator(App);

import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from "aws-amplify"
import awsconfig from "./aws-exports"

Auth.configure(awsconfig);

const App = () => {
  try {
  return (
    <div >
      <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
          slot="sign-up"
          formFields={[
            {
              type: "username",
              label: "Username*",
              inputProps: { required: true, autocomplete: "username" },
            },
            // Email
            {
              type: "email",
              label: "Email*",
              inputProps: { required: true, autocomplete: "username" },
            },
            // Password
            {
              type: "password",
              label: "Password*",
              inputProps: { required: true, autocomplete: "new-password" },
            },
            // First Name
            {
              type: "name",
              label: "First Name*",
              placeholder: "Bob",
              required: true,
              inputProps: { required: true, autocomplete: "Bob" }
            },
            // last name
            {
              type: "family_name",
              label: "Last Name*",
              placeholder: "White",
              required: true,
              inputProps: { required: true, autocomplete: "White" }
            },
          ]} 
        />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
    <AmplifySignOut/>
    </div>
    
  );
        } catch(e){
          console.log("Error:", e);
        }
};

export default App;