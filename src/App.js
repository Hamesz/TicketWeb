import React from 'react';

// states
import { PaymentState } from './State/PaymentState';
import { TicketState } from './State/TicketState';
import { TicketMenuState } from './State/TicketMenuState';
import { AuthState as StateAuth} from './State/AuthState';
// Data fetching
// import { fetchUserPayment } from './DataFetching/UserPayment'
// import { fetchPaymentDetails } from './DataFetching/PaymentDetails';
import {getPaymentDetails} from "./graphql/queries"
import {listUserPayments, getUserPayment} from "./graphql/queries"
// for actual ticket
import {canOpenTicket, isEarlyMorning} from "./Tickets/Ticket"
import {TicketFactory} from "./Tickets/TicketFactory"
// Authentication
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify"
import awsconfig from "./aws-exports"
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
// Code API
import {listCodes, getCode} from "./graphql/queries"

// constants from config
import {USER_PAID, CODE_INITIAL, ROUTES, SWITCH_TIME_WITH_CODE,
  PAYMENT_DETAILS_PLACEHOLDER, USER_PAYMENT_PLACEHOLDER,
  USER_PAYMENT_PAGE_INFO, EARLY_MORNING_TIME_FOR_CODE} from "./config";
import { InfoState } from './State/InfoState';
import { ErrorState } from './State/ErrorState';
import { DefaultState } from './State/DefaultState';

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

const RANDOM_PURCHASE_DATE = createRandomPurchasedDate(new Date(), 6);

function App(){
  // states
  const [ticket, setTicket] = React.useState();
  const [ticketInfo, setTicketInfo] = React.useState(require('./Tickets/ticket_information.json'));
  const [switchTimeWithCode, setSwitchTimeWithCode] = React.useState(SWITCH_TIME_WITH_CODE);
  const [timeState, setTimeState] = React.useState(0);
  const [randomPurchasedDate, setRandomPurchasedDate] =  React.useState(RANDOM_PURCHASE_DATE);
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
    // console.group("Pending app state use Effect: ", pendingAppState);
    if (pendingAppState !== undefined){
      // console.debug("after changing pending state, setting app state to: ", appStates.AUTH);
      setAppState(appStates.AUTH);
    }
    // console.groupEnd();
  }, [pendingAppState, appStates.AUTH])
  
  // this effect gets the code if the user has paid
  React.useEffect(() => {
    // console.group("Fetch Code use Effect");
    /*
    Gets the code for today
    */
    const fetchCode = async () => {
      // console.group("Fetching Code");
      const is_early_morning = isEarlyMorning(new Date(), EARLY_MORNING_TIME_FOR_CODE);
      let date_for_code = new Date();
      if (is_early_morning){
        // we want yesterdays date as the code is assigned to it
        date_for_code.setDate(date_for_code.getDate() - 1);
        // console.debug(`It is early morning so setting date - 1: ${date_for_code.toDateString()}`);
      }
      // convert date to "YYYY-MM-dd" format
      const date_for_code_string = date_for_code.toISOString().split('T')[0];
      // console.debug("date for code: ", date_for_code, date_for_code_string);
      try {
        const codeData = await API.graphql(graphqlOperation(getCode,{"id":date_for_code_string}));//listCodes));//getCode,{"id":"2021-08-30"}));
        console.info("Code Data: ", codeData);
        const code = codeData.data.getCode.code;
        // console.debug("Code: ", code);
        setCode(code);
      }catch(error){
        handleError(error, fetchCode);
      }
      // console.groupEnd();
    }

    if (userPaid === true && code === undefined){
      console.debug("user has paid so fetching code...");
      fetchCode();
    }else{
      console.debug("user has NOT paid so not fetching code...");
    }
    console.groupEnd();
  }, [userPaid, code]);

  // timer
  React.useEffect(() => {
    const timer=setTimeout(() => {
      onTimerTick();
    }, timerRefreshTimeMilli);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  // Called whenever the user's auth state changes
  React.useEffect(() => {
    /*
    Gets the user payment info
    */
    const fetchUserPayment = async (user) => {
      try {
          const userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
          const user_payment = userPaymentData.data.getUserPayment;
          const date = new Date();
          const current_month = date.toLocaleString('default', { month: 'long' });
          const userPaidForMonth = user_payment[current_month];
          setUserPaid(userPaidForMonth);
          setUserPayment(user_payment);
          console.log("User Payment: ", user_payment);
          // fetchPaymentDetails(payment_details_type)
          if (userPaidForMonth === false){
              setAppState(appStates.PAYMENT);
          }
      }catch(error){
          handleError(error, fetchUserPayment);
      }
    }

    return onAuthUIStateChange((nextAuthState, authData) => {
      // fetch data after refreshing page when logged in
      if (nextAuthState === "signedin" && authData && authState === undefined){
        fetchUserPayment(authData);
        if (pendingAppState){
          setAppState(pendingAppState);
        }else{
          console.debug("no pending app state, setting state to: ", appStates.TICKET_MENU);
          setAppState(appStates.TICKET_MENU);
        }
        setAuthState(nextAuthState);
        setUser(authData)
        return;
      }
      // fetch data after logging in
      if (nextAuthState === "signedin" && authData && authState === "signin"){
        setAppState(appStates.TICKET_MENU);
        fetchUserPayment(authData);
        setAuthState(nextAuthState);
        setUser(authData)
        return;
      }
      if (!authData){
        setAppState(appStates.AUTH);
        setAuthState(nextAuthState);
        setUser(authData)
        return;
      }

      if (authState === "signedin" && nextAuthState === "signedin"){
        fetchUserPayment(authData)
        setAppState(appStates.TICKET_MENU);
        setAuthState(nextAuthState);
        setUser(authData)
        return;

      }
      setAuthState(nextAuthState);
      setUser(authData)
      console.groupEnd();
    })
  })


  return (returnAppState());

  /*
  Processes the App by looking at the appState and returns the 
  corresponding render
  */
  function returnAppState(){
    // console.info("In state: ", appState);
    switch (appState){
      default:
        return DefaultState();

      case appStates.AUTH:
        return StateAuth();
  
      case appStates.INFO:
        return InfoState(routes, handleOnClickRoute, App);
  
      case appStates.TICKET_MENU:
        return TicketMenuState(routes, handleOnClickRoute, ticketOptions, ticketInfo, 
          handleTicketClick);
  
      case appStates.TICKET:
        return TicketState(ticket, randomPurchasedDate, handleExpired, user, 
          handleOnClickBackButton, switchTimeWithCode, code);
  
      case appStates.PAYMENT:
          return PaymentState(user, routes, handleOnClickRoute, handleBTCWalletAddresClick, 
            userPayment);
    
      case appStates.ERROR:
        return ErrorState(routes, handleOnClickRoute, errorMsg);
      }
  }

  async function handleBTCWalletAddresClick(address){
    try{
      const response = await Auth.updateUserAttributes(user, {
        'custom:btc_wallet_address': `${address}`
      })
      // get the new updated User data with the new BTC address
      const new_user_data = await Auth.currentAuthenticatedUser();
      setUser(new_user_data);
    }catch (error){
      console.error("Error occured whilst try to update BTC wallet address to: ", address);
    }
  }

  /*
  Sets the appState based on what route was clicked
  */
  function handleOnClickRoute(i){
    // if user has not signed in then sign them in and remeber what route they clicked
    if (!user){ 
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
        console.debug("User clicked route 0, setting state: ", appStates.INFO);
        setAppState(appStates.INFO);
        break;
      case 1:
        if (userPaid === true){
          console.debug("User clicked route 1, setting state: ", appStates.TICKET_MENU);
          setAppState(appStates.TICKET_MENU);
        }else{
          console.debug("User clicked route 0 but has not paid, setting state: ", appStates.PAYMENT);
          setAppState(appStates.PAYMENT);
        }
        break;
      case 2:
        console.debug("User clicked route 2, setting state: ", appStates.PAYMENT);
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
      console.groupEnd();
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
    
    if (ticket_chosen === undefined){
      console.debug("ticket was undefined so going to main menu");
      setAppState(appStates.TICKET_MENU);
      console.groupEnd();
      return;
    }

    if (!canOpenTicket(new Date(), start_time, end_time)){
      alert("Can't open this ticket due to availablity!");
    }else{
      const ticket_object = TicketFactory.createTicket(ticketInfo[ticket_chosen], new Date());
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
    if (ticket !== undefined){
      console.debug(`ticket: ${JSON.stringify(ticket)} is not undefined`);
      if (ticket.isExpired(new Date())){
          handleExpired();
          console.groupEnd();
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
    console.group("An Error was thrown");
    console.error("An error occured: ", error);
    console.error("This was thrown by function: ", f.name);
    let error_msg;
    if (error.errors){
      error_msg = error.errors[0].message;
    }else{
      error_msg = error
    }
    // const alert_msg = "An Error has occured: \"" + error_msg + "\". Please try again and if the problem persists then send an email with the error message included.";
    console.error(`Setting Error msg to: ${error_msg}`);
    console.error(`Setting app state to ERROR`);
    setErrorMsg(error_msg);
    setAppState(appStates.ERROR);
    console.groupEnd();
  }
}

/*
Gets a random date between todays and 6 months before
*/
function createRandomPurchasedDate(date_1, months_before){
    // console.group(`Creating random date from Date: ${date_1} until ${months_before} months before`);
    date_1.setMonth(date_1.getMonth() - months_before);
    const fromTime = date_1.getTime(); //original date

    const toTime = new Date().getTime(); // date x months ahead
    const date_random = new Date(fromTime + Math.random() * (toTime - fromTime));
    
    // console.debug(`Starting Date: ${date_1.toISOString()}`);
    // console.debug(`End Date: ${new Date().toISOString()}`);

    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date_random);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date_random);
    let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date_random);
    let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date_random);
    let time = ("0" + date_random.getHours()).slice(-2) + ":" + ("0" + date_random.getMinutes()).slice(-2);
  
    const date_as_string = `${weekday} ${day} ${month} ${year} at ${time}`
    return date_as_string;
}

export default App;


    