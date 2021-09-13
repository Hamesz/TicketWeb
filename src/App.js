import React from 'react';
// for tickets look
import Ticket from "./Components/ticket-style/ticket"
import TicketMenu from "./Components/menu-style/menu"
import Info from "./Components/info-style/info"
import Payment from './Components/payment-style/payment';
import Error from './Components/error-style/error';
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
import {listPaymentDetails} from "./graphql/queries"
import { AppState, ConsoleLogger } from '@aws-amplify/core';

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

// constants
const CODE_INITIAL = undefined;
const ROUTES = ["INFO","TICKET MENU", "PAYMENT"];
const USER_PAID = false;
const SWITCH_TIME_WITH_CODE = true;
const DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH = 5;  //The # of days where you alert user to pay for next month
const MONTHLY_FEE = "15.00";

const PAYMENT_DETAILS_PLACEHOLDER = {
  id: "",
  beneficiary: "",
  sortCode: "",
  updatedAt: "",
  IBAN: "",
  createdAt: "",
  BIC: "",
  email: "",
  accountNumber: "",
  type: ""
}
const USER_PAYMENT_PLACEHOLDER = {
  id: undefined,
  November: undefined,
  JanuaryNextYear: undefined,
  May: undefined,
  February: undefined,
  subscriptionDate: undefined,
  July: undefined,
  createdAt: undefined,
  October: undefined,
  September: undefined,
  January: undefined,
  June: undefined,
  August: undefined,
  updatedAt: undefined,
  year: undefined,
  April: undefined,
  March: undefined,
  December: undefined
}

function App(){
  // states
  const [ticket, setTicket] = React.useState();
  const [ticketInfo, setTicketInfo] = React.useState(require('./Tickets/ticket_information.json'));
  const [switchTimeWithCode, setSwitchTimeWithCode] = React.useState(SWITCH_TIME_WITH_CODE);
  const [timeState, setTimeState] = React.useState(0);
  const [randomPurchasedDate, setRandomPurchasedDate] =  React.useState(createRandomPurchasedDate());
  const [ticketOptions, setTicketOptions] = React.useState(Object.keys(ticketInfo));  // gets the keys from the ticketInfo
  const [code, setCode] = React.useState(CODE_INITIAL);
  const [routes, setRoutes] = React.useState(ROUTES)
  const [userPaid, setUserPaid] = React.useState(USER_PAID);
  const [paymentDetails, setPaymentDetails] = React.useState(PAYMENT_DETAILS_PLACEHOLDER); 
  const [userPayment, setUserPayment] = React.useState(USER_PAYMENT_PLACEHOLDER);
  const [errorMsg, setErrorMsg] = React.useState();

  /* The States of the App
  0) Prompt the user to sign in/sign up/forgotten password
  1) Display the Ticket selection menu
  2) Display the ticket chosen by the user
  3) Display a blank screen alerting the user they have not paid
  4) Display information to the user about how they can display the ticket
  5) Display payment to the user about how they can pay
  6) Display an Error to the user
  */
  const appStates = {
    AUTH: 0,        // Prompt the user to sign in/sign up/forgotten password
    TICKET_MENU: 1, // Display the Ticket selection menu
    TICKET: 2,      // Display the ticket chosen by the user
    NOT_PAID: 3,    // Display not paid screen alerting the user they have not paid
    INFO: 4,        // Display information to the user about how they can display the ticket
    PAYMENT: 5,     // Display payment to the user about how they can pay
    ERROR: 6        // Display an Error to the user
  };
  const [appState, setAppState] = React.useState(appStates.INFO);
  const [pendingAppState, setPendingAppState] = React.useState();

  // authentication
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  const timerRefreshTimeMilli = 200;  // time for timer in milliseconds
  
  // this is called after pendingAppState has been changed
  React.useEffect(() => {
    console.log("Pending app state: ", pendingAppState);
    if (pendingAppState !== undefined){
      console.log("after changing pending state, setting app state to: ", appStates.AUTH);
      setAppState(appStates.AUTH);
    }
  }, [pendingAppState, appStates.AUTH])
  
  // this effect gets the code if the user has paid
  React.useEffect(() => {
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
        console.log("Code Data: ", codeData);
        const code = codeData.data.getCode.code;
        console.log("Code: ", code);
        setCode(code);
      }catch(error){
        handleError(error, fetchCode);
      }
    }

    if (userPaid === true && code === undefined){
      console.log("user has paid so fetching code...");
      fetchCode();
    }else{
      console.log("user has NOT paid so not fetching code...");
    }
  }, [userPaid, code]);

  // timer
  React.useEffect(() => {
    const timer=setTimeout(() => {
      onTimerTick();
    }, timerRefreshTimeMilli);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  /*
  Used for logging in and out and contains the fetchCode and fetchUserPayment methods
  since these are only ever called by this method
  */
  // React.useEffect(() => {  
    // /*
    // Gets the user payment info
    // */
    // const fetchUserPayment = async (user) => {
    //   try {
    //     const date = new Date();
    //     // const allUserPaymentData = await API.graphql(graphqlOperation(listUserPayments));//getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
    //     // console.log("user attributes in fetchUserPayment: ", user.attributes);
    //     const userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
    //     const current_month = date.toLocaleString('default', { month: 'long' });
    //     const userPaidForMonth = userPaymentData.data.getUserPayment[current_month];
    //     console.log("userPaidForMonth: ", current_month, userPaidForMonth);
    //     console.log("Fetched User Payment: ", userPaymentData.data.getUserPayment);
    //     setUserPaid(userPaidForMonth);
    //     setUserPayment(userPaymentData.data.getUserPayment);
    //     if (userPaidForMonth === false){
    //       console.log("User not paid, setting state to ", appStates.PAYMENT);
    //       setAppState(appStates.PAYMENT);
    //     }
    //   }catch(error){
    //     handleError(error, fetchUserPayment);
    //   }
    // }

    // /*
    // Gets the user payment info
    // */
    // const fetchPaymentDetails = async (user) => {
    //   try {
    //     const allPaymentDetails = await API.graphql(graphqlOperation(listPaymentDetails));
    //     console.log("listed paymentDetails: ", allPaymentDetails);
    //     const payment_details = allPaymentDetails.data.listPaymentDetails.items[0];
    //     console.log("Payment Details for user:", payment_details);
    //     setPaymentDetails(payment_details);
    //   }catch(error){
    //     handleError(error, fetchPaymentDetails);
    //   }
    // }

  //   return onAuthUIStateChange((nextAuthState, authData) => {
  //     // check if we are already in auth state
  //     console.log("\ncurrent app state: ", appState);
  //     console.log("Current auth state: ", authState);
  //     console.log("next auth state: ", nextAuthState);
  //     // if (appState === appStates.AUTH){
  //     //   return;
  //     // }
  //     // setAuthState(nextAuthState);
  //     // setUser(authData)
  //     // console.log("user info", authData);
  //     // console.log("Next auth State:", nextAuthState);

  //     // check if the user is signid in
  //     if (nextAuthState === AuthState.SignedIn && authData){
  //       setAuthState(nextAuthState);
  //       setUser(authData)
  //       console.log("user info", authData);
  //       // console.log("Next auth State:", nextAuthState);

  //       // fetchUserPayment(authData);
  //       // fetchPaymentDetails();
  //       // console.log("Pending app State in AUTH: ", pendingAppState);
  //       // if (pendingAppState){
  //       //   console.log("setting next state to pending app state: ", pendingAppState);
  //       //   setAppState(pendingAppState);
  //       // }else{
  //       //   console.log("no pending app state, setting state to: ", appStates.TICKET_MENU);
  //         setAppState(appStates.TICKET_MENU);
  //       // }
  //     }else if (nextAuthState === AuthState.SignedOut){
  //       //nextAuthState === "signin" || nextAuthState === "signedout" || nextAuthState === forgotpassword
  //       console.log("in auth but not signed in, setting app state to: ", appStates.AUTH);
  //       if (appState === appStates.AUTH){
  //         setAuthState(nextAuthState);
  //         setUser(authData)
  //       }else{
  //         setAppState(appStates.AUTH);
  //       }
  //     }
  //   });
  // }, [appStates.PAYMENT, appStates.TICKET_MENU, handleError, pendingAppState]);

  React.useEffect(() => {
    // console.log("Auth state out of return: ", authState);

       /*
    Gets the user payment info
    */
    const fetchUserPayment = async (user) => {
      try {
        const date = new Date();
        // const allUserPaymentData = await API.graphql(graphqlOperation(listUserPayments));//getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
        // console.log("user attributes in fetchUserPayment: ", user.attributes);
        const userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
        const current_month = date.toLocaleString('default', { month: 'long' });
        const userPaidForMonth = userPaymentData.data.getUserPayment[current_month];
        console.log("userPaidForMonth: ", current_month, userPaidForMonth);
        console.log("Fetched User Payment: ", userPaymentData.data.getUserPayment);
        setUserPaid(userPaidForMonth);
        setUserPayment(userPaymentData.data.getUserPayment);
        if (userPaidForMonth === false){
          console.log("User not paid, setting state to ", appStates.PAYMENT);
          setAppState(appStates.PAYMENT);
        }
      }catch(error){
        handleError(error, fetchUserPayment);
      }
    }

    /*
    Gets the user payment info
    */
    const fetchPaymentDetails = async (user) => {
      try {
        const allPaymentDetails = await API.graphql(graphqlOperation(listPaymentDetails));
        console.log("listed paymentDetails: ", allPaymentDetails);
        const payment_details = allPaymentDetails.data.listPaymentDetails.items[0];
        console.log("Payment Details for user:", payment_details);
        setPaymentDetails(payment_details);
      }catch(error){
        handleError(error, fetchPaymentDetails);
      }
    }

    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log("\ncurrent app state: ", appState);
      console.log("Current AuthState: ", authState);
      console.log("next auth state: ", nextAuthState);
      console.log("Auth data: ", authData);
      setAuthState(nextAuthState);
      setUser(authData)

      // fetch data after refreshing page when logged in
      if (nextAuthState === "signedin" && authData && authState === undefined){
        console.log("fetching data...");
        fetchUserPayment(authData);
        fetchPaymentDetails();
        if (pendingAppState){
          console.log("setting next state to pending app state: ", pendingAppState);
          setAppState(pendingAppState);
        }else{
          console.log("no pending app state, setting state to: ", appStates.TICKET_MENU);
          setAppState(appStates.TICKET_MENU);
        }
        return;
      }
      // fetch data after logging in
      if (nextAuthState === "signedin" && authData && authState === "signin"){
        console.log("fetching data...");
        setAppState(appStates.TICKET_MENU);
        fetchUserPayment(authData);
        fetchPaymentDetails();
        return;
      }
        if (!authData){
          console.log("In auth hook and setting app state to AUTH");
          setAppState(appStates.AUTH);
        }
      // }
    })
  })


  return (returnAppState());

  /*
  Processes the App by looking at the appState and returns the 
  corresponding render
  */
  function returnAppState(){
    console.log("In state: ", appState);
    switch (appState){
      default:
        return (
          <div>
            <h1>Something went wrong, please sign out and refresh.</h1>
            <AmplifySignOut/>
          </div>
        );

      case appStates.AUTH:
        // OAuth
        // const federated = {
        //   googleClientId: 'f34f4w4334w', // Enter your googleClientId here
        //   facebookAppId: 'fqf4q3yt34y34', // Enter your facebookAppId here
        //   amazonClientId: 'q4rtq3tq34tq34' // Enter your amazonClientId here
        // };
        // console.log("Should be returning something now...");
        return (
          //<AmplifyAuthenticator >//federated={federated}>
          <AmplifyAuthenticator >
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
                // btc wallet address
                {
                type: "custom:btc_wallet_address",
                label: "Bitcoin Wallet Address *",
                placeholder: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
                hint: "Used to identify who has paid",
                inputProps: { required: true}
                },

              ]}
            />
          </AmplifyAuthenticator>
        );
  
      case appStates.INFO:
        return (
          <Info
          routes = {routes}
          onClickRoute = {(i) => {handleOnClickRoute(i)}}
          />
        );
  
      case appStates.TICKET_MENU:
        return (
          <div className="Menu Screen">
            <TicketMenu 
              routes = {routes}
              onClickRoute = {(i) => {handleOnClickRoute(i)}}
              tickets = {ticketOptions}
              onClick = {(i) => handleTicketClick(i)}
              ticket_information = {ticketInfo}
            />
          </div>
        );
  
      case appStates.TICKET:
        const date = new Date();
        const time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        const time_left = ticket.getTimes();
        return (
          <Ticket 
            ticket_current = {ticket}
            title = {ticket.title}
            hours_left = { time_left["hours"] !== 0 ? time_left["hours"] : undefined}
            minutes_left = { time_left["minutes"] !== 0 ? time_left["minutes"] : undefined}
            seconds_left = { time_left["seconds"]}
            expiry_date = {ticket.expiry_date_string}
            purchased_date = {randomPurchasedDate}
            expiredFunction = {() => this.handleExpired()}
            passanger = {user.attributes.name + " " + user.attributes.family_name}
            current_time = {switchTimeWithCode ? time : code}
            onClickBackButton = {() => handleOnClickBackButton()}
          />
        );
  
      case appStates.PAYMENT:
        let message = "";
        if (userPayment === USER_PAYMENT_PLACEHOLDER || paymentDetails === PAYMENT_DETAILS_PLACEHOLDER){
          message = "Data still waiting to be retrieved...";
        }
        return (
          <div>
            <div>
            <Payment 
              routes = {routes}
              onClickRoute = {(i) => {handleOnClickRoute(i)}}
              bankInfo = {{type:paymentDetails.type, sortCode:paymentDetails.sortCode, accountNumber:paymentDetails.accountNumber, beneficiary:paymentDetails.beneficiary, ref:"bus app", email:paymentDetails.email}}
              paymentInfo = {generatePaymentInfo(userPayment)}
            />
          </div>
          <div className="message">
            {message}
          </div>
          </div>
          
        );
    
      case appStates.ERROR:
        return (
          < Error 
            routes = {routes}
            onClickRoute = {(i) => {handleOnClickRoute(i)}}
            errorMsg = {errorMsg}
          />
        );
      }
  }

  /*
  Sets the appState based on what route was clicked
  */
  function handleOnClickRoute(i){
    console.log("leaving state: ", appState);

    // if user has not signed in then sign them in and remeber what route they clicked
    if (!user){ 
      console.log("User is not signed in, setting state: ", appStates.AUTH);
      switch (i){
        case 0:
          setPendingAppState(appStates.INFO);
          break;
        case 1:
          setPendingAppState(appStates.TICKET_MENU);
          break;
        case 2:
          setPendingAppState(appStates.PAYMENT)
          break
        default:
          setPendingAppState(appStates.INFO);
          break;
      }
      return;
    }
    // else allow them to freely move between pages
    switch(i){
      case 0:
        console.log("User clicked route 0, setting state: ", appStates.INFO);
        setAppState(appStates.INFO);
        break;
      case 1:
        if (userPaid === true){
          console.log("User clicked route 1, setting state: ", appStates.TICKET_MENU);
          setAppState(appStates.TICKET_MENU);
        }else{
          console.log("User clicked route 0 but has not paid, setting state: ", appStates.PAYMENT);
          setAppState(appStates.PAYMENT);
        }
        break;
      case 2:
        console.log("User clicked route 2, setting state: ", appStates.PAYMENT);
        setAppState(appStates.PAYMENT);
        break;
      default:
        if (userPaid === true){
          setAppState(appStates.TICKET_MENU);
        }else{
          setAppState(appStates.INFO);
        }
        break;
    }
  }

  function handleOnClickBackButton(){
    setAppState(appStates.TICKET_MENU);
    setTicket(undefined);
  }
  /*
  Sets the ticket chosen by the user and will reload the app to display the ticket
  */
  function handleTicketClick(idx){
    // first check if user has paid and logged In
    if (!(user)){
      setAppState(appStates.AUTH);
      return;
    }
    if (!userPaid){
      setAppState(appStates.PAYMENT);
      return;
    }

    const ticket_chosen = ticketOptions[idx]
    // check if we can use this ticket
    const start_time = ticketInfo[ticket_chosen]["availability_start"];
    const end_time =  ticketInfo[ticket_chosen]["availability_end"];
    
    console.log("Ticket chosen was", ticket_chosen);

    if (ticket_chosen === undefined){
      setAppState(appStates.TICKET_MENU);
      return;
    }

    if (!canOpenTicket(start_time, end_time)){
      alert("Can't open this ticket due to availablity!");
    }else{
      const ticket_object = new TicketFactory().createTicket(ticketInfo[ticket_chosen])
      console.log("Ticket created by factory:", ticket_object);
      setTicket(ticket_object); 
      setAppState(appStates.TICKET);
    }
  }

  /*
  Handles the case when the ticket has expired
  */
  function handleExpired(){
      // alert("Ticket has expired!");
      setTicket(undefined);
      setAppState(appStates.TICKET_MENU);
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
        const num_states = 1000/timerRefreshTimeMilli;
        setTimeState((timeState + 1)%num_states);
        if (timeState === (num_states - 1)){
          setSwitchTimeWithCode(!switchTimeWithCode);
        }
      }
  }    

  /*
  Handles an error by setting the app state to ERROR
  */
  function handleError(error, f){
    console.log("An error occured: ", error);
    console.log("This was thrown by function: ", f.name);
    let error_msg;
    if (error.errors){
      error_msg = error.errors[0].message;
    }else{
      error_msg = error
    }
    // const alert_msg = "An Error has occured: \"" + error_msg + "\". Please try again and if the problem persists then send an email with the error message included.";
    setErrorMsg(error_msg);
    setAppState(appStates.ERROR);
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



/*
Determines the month payment is due and for how much.
If the user has not paid for the current month then that is returned with PAYMENT_FEE as amount.
If they have paid then amount is 0.00, unless its DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH before the end of
the month. At which we tell the user to pay for the next month (in advance so they are guaranteed access).
Again if they have paid for the next month then they will be shown amount of 0.
*/
function generatePaymentInfo(userPayment){
  /*
  Get the number of days remaining within the current month
  */
  function getRemainingDaysUntilEndOfMonth(){
    const date = new Date();
    let time = new Date(date.getTime());
    time.setMonth(date.getMonth() + 1);
    time.setDate(0);
    const days = time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
    return days;
  }
  console.log("In getRemainingDaysUntilEndOfMonth");
  const date = new Date();
  const date_next_month = new Date(date.getTime());
  date_next_month.setMonth(date.getMonth() + 1);

  const current_month = date.toLocaleString('default', { month: 'long' });
  const next_month = date_next_month.toLocaleString('default', { month: 'long' });
  // console.log("User Payment: ", userPayment);
  const userPaidForCurrentMonth = userPayment[current_month];
  
  let month_to_pay;
  let amount;
  // check if user has paid for current month
  if (userPaidForCurrentMonth === true){
    console.log("user paid for current month: ", current_month);
    // check if date is 5 days before month end
    const days_left = getRemainingDaysUntilEndOfMonth();

    // check if user has paid for next month and set amount appropriatly
    if (days_left < DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH){
      console.log("Time to alert user to pay for next month: ", next_month);
      // check if the month is december in which the next month is Januray but for the next year
      let userPaidForNextMonth;
      if (current_month === 12){
        userPaidForNextMonth = userPayment["JanuaryNextYear"];
      }else{
        userPaidForNextMonth = userPayment[next_month];
      }
      month_to_pay = next_month;
      if (userPaidForNextMonth === true){
        amount = "0.00";
        console.log("User paid for next month");
      }else if (userPaidForNextMonth === false){
        amount = MONTHLY_FEE;
        console.log("User not paid for next month");
      }else{
        amount = "";
      }
    }else{
      // user has paid for current month but it is too soon to tell them
      // to pay for next month
      month_to_pay = current_month;
      amount = "0.00";
    }
  }else if (userPaidForCurrentMonth === false){
    // user has not paid for current month
    console.log("user not paid for current month: ", current_month);
    month_to_pay = current_month;
    amount = MONTHLY_FEE;
  }else{
    month_to_pay = "";
    amount = "";
  }
  return {month:month_to_pay, amount:amount};
}

export default App;


    