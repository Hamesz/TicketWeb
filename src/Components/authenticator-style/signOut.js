import React from 'react';
import { Auth } from "aws-amplify"
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';
import { useNavigate } from "react-router-dom"

export default function SignOut({setAuthState, setUser}){

  const navigate = useNavigate();

  // Called whenever the user's auth state changes
  React.useEffect(() => {
    signout();
    return () => {
      navigate("/home");
    }
  })   

  return (
    <AmplifyAuthenticator>
      <div>
        Logged Out
      </div>
    </AmplifyAuthenticator>
  );

  function signout() {
    Auth.signOut()
      .then(data => {
        // setAuthState(undefined)
        // setUser(undefined)
      })
      .catch(err => console.error(err));
  }

}

