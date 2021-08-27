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

// import React from 'react';
// import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
// import Amplify, { Auth } from "aws-amplify"
// import awsconfig from "./aws-exports"

// Auth.configure(awsconfig);

// const App = () => {
//   try {
//   return (
//     <div >
//       <AmplifyAuthenticator usernameAlias="email">
//       <AmplifySignUp
//           slot="sign-up"
//           formFields={[
//             {
//               type: "username",
//               label: "Username*",
//               inputProps: { required: true, autocomplete: "username" },
//             },
//             // Email
//             {
//               type: "email",
//               label: "Email*",
//               inputProps: { required: true, autocomplete: "username" },
//             },
//             // Password
//             {
//               type: "password",
//               label: "Password*",
//               inputProps: { required: true, autocomplete: "new-password" },
//             },
//             // First Name
//             {
//               type: "name",
//               label: "First Name*",
//               placeholder: "Bob",
//               required: true,
//               inputProps: { required: true, autocomplete: "Bob" }
//             },
//             // last name
//             {
//               type: "family_name",
//               label: "Last Name*",
//               placeholder: "White",
//               required: true,
//               inputProps: { required: true, autocomplete: "White" }
//             },
//           ]} 
//         />
//       <AmplifySignIn slot="sign-in" usernameAlias="email" />
//     </AmplifyAuthenticator>
//     <AmplifySignOut/>
//     </div>
    
//   );
//         } catch(e){
//           console.log("Error:", e);
//         }
// };

// export default App;

import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => {
    // Declare a new state variable, which we'll call "authState" initialised as undefined
    const [authState, setAuthState] = React.useState();
    // Declare a new state variable, which we'll call "user" initialised as undefined
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        // console.log("user info", user);
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);
  
  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.attributes.name}</div>
          <AmplifySignOut />
      </div>
    ) : (
      <AmplifyAuthenticator>
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
      </AmplifyAuthenticator>
  );
}

// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       user: undefined,
//       authState: undefined
//     }
//   }

//   render(){
//     if (this.state.authState === AuthState.SignedIn && this.state.user){
//       console.log("User signed in", this.state.user.attributes);
//       return (
//         <div>
//           <h2>Hello</h2>
//         </div>
//       );}
//     else{
//       console.log("User not logged in");
//       return (
//         <AmplifyAuthenticator>
//           <AmplifySignUp
//             slot="sign-up"
//             formFields={[
//               {
//                 type: "username",
//                 label: "Username*",
//                 inputProps: { required: true, autocomplete: "username" },
//               },
//               // Email
//               {
//                 type: "email",
//                 label: "Email*",
//                 inputProps: { required: true, autocomplete: "username" },
//               },
//               // Password
//               {
//                 type: "password",
//                 label: "Password*",
//                 inputProps: { required: true, autocomplete: "new-password" },
//               },
//               // First Name
//               {
//                 type: "name",
//                 label: "First Name*",
//                 placeholder: "Bob",
//                 required: true,
//                 inputProps: { required: true, autocomplete: "Bob" }
//               },
//               // last name
//               {
//                 type: "family_name",
//                 label: "Last Name*",
//                 placeholder: "White",
//                 required: true,
//                 inputProps: { required: true, autocomplete: "White" }
//               },
//             ]}
//           />
//         </AmplifyAuthenticator>
//     );
//     }
//   }

//   componentDidMount(){
//     console.log('Mounting timer');
//     const time_delay = 1000; //1000ms
//     // set up a timer
//     // this.timer = setInterval(() => {(this.getTimeandTimeLeft(this.state.ticket, this.handleExpired));}, time_delay);
//     // authentication
//     // onAuthUIStateChange(
//     //   (nextAuthState, authData) => {
//     //     this.setState({authState: nextAuthState, user: authData});
//     //   });
//   }

//   componentDidUpdate(){
//     // onAuthUIStateChange(
//     //   (nextAuthState, authData) => {
//     //     this.setState({authState: nextAuthState, user: authData});
//     //   });
//     return;
//   }

//   componentWillUnmount(){
//     console.log("Unmounting timer");
//     clearInterval(this.timer);
//     onAuthUIStateChange(
//       (nextAuthState, authData) => {
//         this.setState({authState: nextAuthState, user: authData});
//       });
//   }
// }
export default App;