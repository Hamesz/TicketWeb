import React from 'react';
// for tickets look
import Ticket from "./Components/ticket-style/ticket"
import TicketList from "./Components/menu-style/Content/Content"
// for actual ticket
import {canOpenTicket, isEarlyMorning} from "./Tickets/Ticket"
import {TicketFactory} from "./Tickets/TicketFactory"
// Authentication
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify"
import awsconfig from "./aws-exports"
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
// Code API
import {listCodes, getCode} from "./graphql/queries"
import {listUserPayments, getUserPayment} from "./graphql/queries"

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

function App(){
  // states
  const [ticket, setTicket] = React.useState();
  const [ticketInfo, setTicketInfo] = React.useState(require('./Tickets/ticket_information.json'));
  const [switchTimeWithCode, setSwitchTimeWithCode] = React.useState(true);
  const [randomPurchasedDate, setRandomPurchasedDate] =  React.useState(createRandomPurchasedDate());
  const [ticketOptions, setTicketOptions] = React.useState(Object.keys(ticketInfo));  // gets the keys from the ticketInfo
  const [code, setCode] = React.useState("8008");
  const [userPaid, setUserPaid] = React.useState(true);

  // authentication
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  /*
  Gets the code for today
  */
  const fetchCode = async () => {
    const is_early_morning = isEarlyMorning();
    let date_for_code = new Date();
    if (is_early_morning){
      // we want yesterdays date as the code is assigned to it
      date_for_code.setDate(date_for_code.getDate() - 1);
    }
    // convert date to "YYYY-MM-dd" format
    const date_for_code_string = date_for_code.toISOString().split('T')[0];
    console.log("date for code: ", date_for_code, date_for_code_string);
    try {
      const codeData = await API.graphql(graphqlOperation(getCode,{"id":date_for_code_string}));//listCodes));//getCode,{"id":"2021-08-30"}));
      const code = codeData.data.getCode.code;
      console.log("Code: ", code);
      setCode(code);
    }catch(error){
      console.log("fetchCode Error: ", error);
    }
  }

  const fetchUserPayment = async (user) => {
    try {
      const date = new Date();
      // const allUserPaymentData = await API.graphql(graphqlOperation(listUserPayments));//getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
      // console.log("user attributes in fetchUserPayment: ", user.attributes);
      const userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
      const current_month = date.toLocaleString('default', { month: 'long' });
      const userPaidForMonth = userPaymentData.data.getUserPayment[current_month];
      console.log("userPaidForMonth: ", current_month, userPaidForMonth);
      setUserPaid(userPaidForMonth);
    }catch(error){
      console.log("fetchCode Error: ", error);
    }
  }

  // timer
  React.useEffect(() => {
    const timer=setTimeout(() => {
      onTimerTick();
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  // used for logging in and out
  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
      console.log("user info", authData);
      fetchCode();
      fetchUserPayment(authData);
    });
  }, []);

    
  /*
  Three States:
  1) Prompt the user to sign in/sign up/forgotten password
  2) Display the Ticket selection menu
  3) Display the ticket chosen by the user
  4) Display a blank screen alerting the user they have not paid

  State 1 is automaticlly shown, 
  In order to get to state 2 the user must authenticate and log in, 
  then to get to state 3 the user must choose an available ticket!
  */
  if ((authState === AuthState.SignedIn && user && userPaid)){
      // State 2
      if(ticket === undefined){
          return (
            <div className="Menu Screen">
              <TicketList 
                tickets = {ticketOptions}
                onClick = {(i) => handleClick(i)}
                ticket_information = {ticketInfo}
              />
              <AmplifySignOut />
            </div>
          );
        }// State 3. View a ticket
        else{
          const date = new Date();
          const time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
          const time_left = ticket.getTimes();
          return (
            <Ticket 
              ticket_current = {ticket}
              title = {ticket.title}
              hours_left = { time_left["hours"] !== 0 ? time_left["hours"] : undefined}
              minutes_left = { time_left["minutes"] !== 0 ? time_left["minutes"] : undefined}
              seconds_left = { time_left["seconds"] !== 0 ? time_left["seconds"] : undefined}
              expiry_date = {ticket.expiry_date_string}
              purchased_date = {randomPurchasedDate}
              expiredFunction = {() => this.handleExpired()}
              passanger = {user.attributes.name + " " + user.attributes.family_name}
              current_time = {switchTimeWithCode ? time : code}
            />
          );
      }
  }
  // state 4. Tell use they have not paid
  else if (userPaid === false){
    return (
      <div>
        <h1>You have not paid for this month. Contact Supplier!</h1>
        <AmplifySignOut />
      </div>
      );
  }
  // State 1. Authenticate
  else{
      return (
        <AmplifyAuthenticator>
          <AmplifySignUp
            slot="sign-up"
            formFields={[
              {
              type: "username",
              label: "Username *",
              inputProps: { required: true, autocomplete: "username" },
              },
              // Email
              {
              type: "email",
              label: "Email *",
              inputProps: { required: true, autocomplete: "username" },
              },
              // Password
              {
              type: "password",
              label: "Password *",
              inputProps: { required: true, autocomplete: "new-password" },
              },
              // First Name
              {
              type: "name",
              label: "First Name *",
              placeholder: "Bob",
              hint: "Used as the name on your ticket",
              inputProps: { 
                required: true, 
                autocomplete: "Bob" 
                }
              },
              // last name
              {
              type: "family_name",
              label: "Last Name *",
              placeholder: "White",
              hint: "Used as the name on your ticket",
              inputProps: { required: true, autocomplete: "White" }
              },
            ]}
          />
        </AmplifyAuthenticator>
      );
  }

  /*
  Sets the ticket chosen by the user and will reload the app to display the ticket
  */
  function handleClick(idx){
      const ticket_chosen = ticketOptions[idx]
      // check if we can use this ticket
      const start_time = ticketInfo[ticket_chosen]["availability_start"];
      const end_time =  ticketInfo[ticket_chosen]["availability_end"];
      
      console.log("Ticket chosen was", ticket_chosen);
  
      if (ticket_chosen === undefined){
        return;
      }
  
      if (!canOpenTicket(start_time, end_time)){
        alert("Can't open this ticket due to availablity!");
      }else{
        const ticket_object = new TicketFactory().createTicket(ticketInfo[ticket_chosen])
        console.log("Ticket created by factory:", ticket_object);
        setTicket(ticket_object); 
      }
  }

  /*
  Handles the case when the ticket has expired
  */
  function handleExpired(){
      // alert("Ticket has expired!");
      setTicket(undefined);
    }
  
  /*
  Handles everything to do on the timer tick. This includes checking if the ticket has expired
  and setting switch time with code
  */
  function onTimerTick(){
      // console.log("In timer method");
      if (ticket !== undefined){
        if (ticket.isExpired()){
            console.log("Ticket has expired");
            handleExpired();
            return;
        }
        setSwitchTimeWithCode(!switchTimeWithCode);
      }
    }    
}

/*
Gets a random date between todays and 6 months before
*/
function createRandomPurchasedDate(){
    let fromTime = new Date();
    fromTime.setMonth(fromTime.getMonth() - 6);
    fromTime = fromTime.getTime(); //6 months before
  
    const toTime = new Date().getTime(); // todays date
    const date = new Date(fromTime + Math.random() * (toTime - fromTime));
  
    // let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
    let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  
    const date_as_string = `${weekday} ${day} ${month} at ${time}`
    return date_as_string;
}

export default App;


    