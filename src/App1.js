import React, {useEffect} from 'react';
import "./App.css";
import awsconfig from "./aws-exports";
import Amplify, { Auth, Hub } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/routes"
import axios from "axios";

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

export default function App() {
  // User
  const [user, setUser] = React.useState();
  const [paid, setPaid] = React.useState(false);
  const [code, setCode] = React.useState('');
  const userLoggedIn = user !== undefined;

  useEffect(() => {
    async function updateUser() {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch {
        setUser(undefined)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events

   // we are not using async to wait for updateUser, so there will be a flash of page where the user is assumed not to be logged in. If we use a flag 
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser) // cleanup
  }, []);

  useEffect(() => {
    async function getPaidAndCode() {
      const url = "https://2l8b76s9e6.execute-api.eu-west-1.amazonaws.com/Production/code";
      try{
        const userId = user.attributes.sub;
        const date = new Date().toISOString();
        const response = await axios.get((url),
        {
          params: {userId: userId, date: date}
        })
        setPaid(response.data.body.paid);
        setCode(response.data.body.code);
      }catch (error){
        console.error(error.response);
      }
    }
    if (user !== undefined) {
      getPaidAndCode();
    } else {
      setPaid(false);
      setCode('');
    }
  }, [user]);

  return (
    <div className="app">
      <Router>
        <AppRoutes
          user={user}
          userLoggedIn={userLoggedIn}
          paid={paid}
          code={code}
        />
      </Router>   
    </div>
  );
}