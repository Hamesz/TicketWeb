import React from 'react';

// states
import { PaymentState } from './State/PaymentState';
import { TicketState } from './State/TicketState';
import { TicketMenuState } from './State/TicketMenuState';
import { AuthState as StateAuth} from './State/AuthState';
// Data fetching
import { fetchUserPayment } from './DataFetching/UserPayment'
import { fetchPaymentDetails } from './DataFetching/PaymentDetails';
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
  DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH, MONTHLY_FEE, 
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
  const [userPaymentPageInfo, setUserPaymentPageInfo] = React.useState(USER_PAYMENT_PAGE_INFO);
  const [BTCAmount, setBTCAmount] = React.useState("...");

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
  
  /*
  This function gets the BTC price for 15 pounds and sets it
  */
  function getAndSetBTCPrice(amount){
    console.debug("getting BTC amount: ", amount);
    const currency="GBP";
    if(amount === ""){
      console.warn(`amount for getting BTC was "", setting to "..."`);
      setBTCAmount("...");
      return;
    }
    fetch(`https://blockchain.info/tobtc?currency=${currency}&value=${amount}`)
      .then(async response => {
        const data = await(response.json());
        console.log("Got BTC data: ", data);
        setBTCAmount(data);
      })
      .catch(error => {
        console.error("There was an error fetch BTC price:", error);
        handleError(error);
      })
  }

  // this is called after pendingAppState has been changed
  React.useEffect(() => {
    console.group("Pending app state use Effect: ", pendingAppState);
    if (pendingAppState !== undefined){
      console.debug("after changing pending state, setting app state to: ", appStates.AUTH);
      setAppState(appStates.AUTH);
    }
    console.groupEnd();
  }, [pendingAppState, appStates.AUTH])
  
  // this effect gets the code if the user has paid
  React.useEffect(() => {
    console.group("Fetch Code use Effect");
    /*
    Gets the code for today
    */
    const fetchCode = async () => {
      console.group("Fetching Code");
      const is_early_morning = isEarlyMorning(new Date(), EARLY_MORNING_TIME_FOR_CODE);
      let date_for_code = new Date();
      if (is_early_morning){
        // we want yesterdays date as the code is assigned to it
        date_for_code.setDate(date_for_code.getDate() - 1);
        console.debug(`It is early morning so setting date - 1: ${date_for_code.toDateString()}`);
      }
      // convert date to "YYYY-MM-dd" format
      const date_for_code_string = date_for_code.toISOString().split('T')[0];
      console.debug("date for code: ", date_for_code, date_for_code_string);
      try {
        const codeData = await API.graphql(graphqlOperation(getCode,{"id":date_for_code_string}));//listCodes));//getCode,{"id":"2021-08-30"}));
        console.info("Code Data: ", codeData);
        const code = codeData.data.getCode.code;
        console.debug("Code: ", code);
        setCode(code);
      }catch(error){
        handleError(error, fetchCode);
      }
      console.groupEnd();
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
      console.group(`Fetching user payment for user: ${user.username}`);
      try {
          const userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
          console.group("Proccessing user payment", userPaymentData);
          const user_payment = userPaymentData.data.getUserPayment;
          const date = new Date();
          const current_month = date.toLocaleString('default', { month: 'long' });
          const userPaidForMonth = user_payment[current_month];
          console.debug("userPaidForMonth: ", current_month, userPaidForMonth);
          console.info("Fetched User Payment: ", user_payment);
          setUserPaid(userPaidForMonth);
          setUserPayment(user_payment);

          // fetch payment details
          const payment_details_type = user_payment.type;
          fetchPaymentDetails(payment_details_type)
          if (userPaidForMonth === false){
              console.info("User not paid, setting state to ", appStates.PAYMENT);
              setAppState(appStates.PAYMENT);
          }
          const user_payment_page_info = generatePaymentInfo(user_payment);
          setUserPaymentPageInfo(user_payment_page_info);
      }catch(error){
          handleError(error, fetchUserPayment);
      }
      console.groupEnd();
    }
  

  /*
  Gets the user payment info
  */
    const fetchPaymentDetails = async (payment_details_type) => {
      console.group('Fetching Payment details of type', payment_details_type)
      try {
          // const allPaymentDetails = await API.graphql(graphqlOperation(listPaymentDetails));
          const payment_details = await API.graphql(graphqlOperation(getPaymentDetails,{"id":payment_details_type}))
          console.debug("Payment Details: ", payment_details);
          setPaymentDetails(payment_details.data.getPaymentDetails);
      }catch(error){
          handleError(error, fetchPaymentDetails);
      }
      console.groupEnd();
    }
    
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.group("onAuthUIStateChange");
      console.debug("\ncurrent app state: ", appState);
      console.debug("Current AuthState: ", authState);
      console.debug("next auth state: ", nextAuthState);
      console.debug("Auth data: ", authData);

      // setAuthState(nextAuthState);
      // setUser(authData)

      // fetch data after refreshing page when logged in
      if (nextAuthState === "signedin" && authData && authState === undefined){
        console.debug("fetching data...");
        fetchUserPayment(authData);
        if (pendingAppState){
          console.debug("setting next state to pending app state: ", pendingAppState);
          setAppState(pendingAppState);
        }else{
          console.debug("no pending app state, setting state to: ", appStates.TICKET_MENU);
          setAppState(appStates.TICKET_MENU);
        }
        setAuthState(nextAuthState);
        setUser(authData)
        console.groupEnd();
        return;
      }
      // fetch data after logging in
      if (nextAuthState === "signedin" && authData && authState === "signin"){
        console.debug("fetching data...");
        setAppState(appStates.TICKET_MENU);
        fetchUserPayment(authData);
        setAuthState(nextAuthState);
        setUser(authData)
        console.groupEnd();
        return;
      }
      if (!authData){
        console.debug("In auth hook and setting app state to AUTH");
        setAppState(appStates.AUTH);
        setAuthState(nextAuthState);
        setUser(authData)
        console.groupEnd();
        return;
      }

      if (authState === "signedin" && nextAuthState === "signedin"){
        console.debug(`User signed in, setting state to TICKET_MENU`);
        setAppState(appStates.TICKET_MENU);
        setAuthState(nextAuthState);
        setUser(authData)
        console.groupEnd();
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
    console.info("In state: ", appState);
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
          return PaymentState(USER_PAYMENT_PLACEHOLDER, PAYMENT_DETAILS_PLACEHOLDER, BTCAmount, user, 
            routes, handleOnClickRoute, paymentDetails, userPaymentPageInfo, handleBTCWalletAddresClick, 
            userPayment);
    
      case appStates.ERROR:
        return ErrorState(routes, handleOnClickRoute, errorMsg);
      }
  }

  async function handleBTCWalletAddresClick(address){
    console.info("Changing Users BTC wallet address to:", address);
    try{
      console.log("Auth.currentAuthenticatedUser(): ", user);
      const response = await Auth.updateUserAttributes(user, {
        'custom:btc_wallet_address': `${address}`
      })
      // get the new updated User data with the new BTC address
      const new_user_data = await Auth.currentAuthenticatedUser();
      console.log("User data after changing BTC address: ", new_user_data);
      setUser(new_user_data);
    }catch (error){
      console.error("Error occured whilst try to update BTC wallet address to: ", address);
      handleError(error);
    }
  }

  /*
  Sets the appState based on what route was clicked
  */
  function handleOnClickRoute(i){
    console.group(`Handling Clicking Route: ${i}`);
    console.info("leaving state: ", appState);

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
      console.groupEnd();
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
    console.groupEnd();
  }

  function handleOnClickBackButton(){
    console.group("Handling on click back button")
    setAppState(appStates.TICKET_MENU);
    setTicket(undefined);
    console.groupEnd();
  }

  /*
  Sets the ticket chosen by the user and will reload the app to display the ticket
  */
  function handleTicketClick(idx){
    console.group(`handle Ticket Click: ${idx}`);
    // first check if user has paid and logged In
    if (!(user)){
      console.info(`User ${JSON.stringify(user)} is undefined, set app state to AUTH`);
      setAppState(appStates.AUTH);
      console.groupEnd();
      return;
    }
    if (!userPaid){
      console.info(`User ${userPaid} is false, set app state to PAYMENT`);
      setAppState(appStates.PAYMENT);
      console.groupEnd();
      return;
    }

    const ticket_chosen = ticketOptions[idx]
    // check if we can use this ticket
    const start_time = ticketInfo[ticket_chosen]["availability_start"];
    const end_time =  ticketInfo[ticket_chosen]["availability_end"];
    
    console.info("Ticket chosen was", ticket_chosen);

    if (ticket_chosen === undefined){
      console.debug("ticket was undefined so going to main menu");
      setAppState(appStates.TICKET_MENU);
      console.groupEnd();
      return;
    }

    if (!canOpenTicket(new Date(), start_time, end_time)){
      console.info(`availability: start time = ${start_time}, end time = ${end_time}\nfor the ticket is unavailable`)
      alert("Can't open this ticket due to availablity!");
    }else{
      const ticket_object = TicketFactory.createTicket(ticketInfo[ticket_chosen], new Date());
      console.debug("Ticket created by factory:", ticket_object);
      setTicket(ticket_object); 
      setAppState(appStates.TICKET);
    }
    console.groupEnd();
  }

  /*
  Handles the case when the ticket has expired
  */
  function handleExpired(){
      console.group("Handling ticket being expired");
      console.info(`setting ticket: ${JSON.stringify(ticket)} to undefined`);
      console.debug(`Setting App state to TICKET_MENU`);
      // alert("Ticket has expired!");
      setTicket(undefined);
      setAppState(appStates.TICKET_MENU);
      console.groupEnd();
  }
  
  /*
  Handles everything to do on the timer tick. This includes checking if the ticket has expired
  and setting switch time with code
  */
  function onTimerTick(){
    console.group("In timer method");
    if (ticket !== undefined){
      console.debug(`ticket: ${JSON.stringify(ticket)} is not undefined`);
      if (ticket.isExpired(new Date())){
          console.debug("Ticket has expired");
          handleExpired();
          console.groupEnd();
          return;
      }
      const num_states = 1000/timerRefreshTimeMilli;
      setTimeState((timeState + 1)%num_states);
      if (timeState === (num_states - 1)){
        console.debug(`time state: ${timeState}, which means its stime to invert switchTimeWithCode`);
        setSwitchTimeWithCode(!switchTimeWithCode);
      }
    }
    console.groupEnd();
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

  /*
  Determines the month payment is due and for how much.
  If the user has not paid for the current month then that is returned with PAYMENT_FEE as amount.
  If they have paid then amount is 0.00, unless its DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH before the end of
  the month. At which we tell the user to pay for the next month (in advance so they are guaranteed access).
  Again if they have paid for the next month then they will be shown amount of 0.
  */
  function generatePaymentInfo(userPayment){
    console.group(`Generating Payment Info with user payment`);
    console.info("User Payment: ", userPayment);
    /*
    Get the number of days remaining within the current month
    */
    function getRemainingDaysUntilEndOfMonth(date){
      console.group(`Getting Ramainig days until the end of the month from date: ${date}`);
      // const date = new Date();
      let time = new Date(date.getTime());
      time.setMonth(date.getMonth() + 1);
      time.setDate(0);
      const days = time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
      console.debug(`Days left until end of the month: ${days}`);
      return days;
    }

    const date = new Date();
    const date_next_month = new Date(date.getTime());
    date_next_month.setMonth(date.getMonth() + 1);

    const current_month = date.toLocaleString('default', { month: 'long' });
    console.debug(`Current Month: ${current_month}`);
    const next_month = date_next_month.toLocaleString('default', { month: 'long' });
    console.debug(`Next Month: ${next_month}`);
    const userPaidForCurrentMonth = userPayment[current_month];
    console.debug(`User has paid for current month: ${userPaidForCurrentMonth}`);

    let month_to_pay;
    let amount;
    // check if user has paid for current month
    if (userPaidForCurrentMonth === true){
      console.debug("user paid for current month: ", current_month);
      // check if date is 5 days before month end
      const days_left = getRemainingDaysUntilEndOfMonth(date);
      // check if user has paid for next month and set amount appropriatly
      if (days_left < DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH){
        console.debug("Time to alert user to pay for next month: ", next_month);
        // check if the month is december in which the next month is Januray but for the next year
        let userPaidForNextMonth;
        if (current_month === 12){
          console.debug(`Current Month is December so checking is user paid for JanuaryNextYear`);
          userPaidForNextMonth = userPayment["JanuaryNextYear"];
        }else{
          console.debug(`Current Month is not December`);
          userPaidForNextMonth = userPayment[next_month];
        }
        console.debug(`User paid for next month: ${userPaidForNextMonth}`);
        month_to_pay = next_month;
        if (userPaidForNextMonth === true){
          amount = "0.00";
          console.debug(`User paid for next month, so setting amount to: ${amount}`);
        }else if (userPaidForNextMonth === false){
          amount = MONTHLY_FEE;
          console.debug(`User not paid for next month, so setting amount to ${amount}`);
        }else{
          amount = "";
          console.debug(`Data not fetched, so setting amount to: ${amount}`);
        }
      }else{
        // user has paid for current month but it is too soon to tell them
        // to pay for next month
        month_to_pay = current_month;
        amount = "0.00";
        console.debug(`Not time to alert the user for next months payment`);
        console.debug(`Setting month to pay: ${month_to_pay}`);
        console.debug(`Setting amount: ${amount}`);
      }
    }else if (userPaidForCurrentMonth === false){
      // user has not paid for current month
      console.debug(`user not paid for current month: ${current_month}`);
      month_to_pay = current_month;
      amount = MONTHLY_FEE;
      console.debug(`Setting month to pay: ${month_to_pay}`);
        console.debug(`Setting amount: ${amount}`);
    }else{
      month_to_pay = "";
      amount = "";
      console.debug(`Data not fetched`);
      console.debug(`Setting month to pay: ${month_to_pay}`);
      console.debug(`Setting amount: ${amount}`);
    }
    getAndSetBTCPrice(amount);
    const payment_page_info = {month:month_to_pay, amount:amount};
    console.info(`payment_page_info: ${JSON.stringify(payment_page_info)}`)
    console.groupEnd();
    return payment_page_info;
  }
}

/*
Gets a random date between todays and 6 months before
*/
function createRandomPurchasedDate(date_1, months_before){
    console.group(`Creating random date from Date: ${date_1} until ${months_before} months before`);
    date_1.setMonth(date_1.getMonth() - months_before);
    const fromTime = date_1.getTime(); //original date

    const toTime = new Date().getTime(); // date x months ahead
    const date_random = new Date(fromTime + Math.random() * (toTime - fromTime));
    
    console.debug(`Starting Date: ${date_1.toISOString()}`);
    console.debug(`End Date: ${new Date().toISOString()}`);

    // let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date_random);
    let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date_random);
    let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date_random);
    let time = ("0" + date_random.getHours()).slice(-2) + ":" + ("0" + date_random.getMinutes()).slice(-2);
  
    const date_as_string = `${weekday} ${day} ${month} at ${time}`
    console.debug(`Random Date as string: ${date_as_string}`);
    console.groupEnd();
    return date_as_string;
}

export default App;


    