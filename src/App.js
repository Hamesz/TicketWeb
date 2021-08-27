import { AppWrap } from './App.styles';
import React, {useCallback}  from 'react';

// for tickets
import Ticket from "./Components/ticket-style/ticket"
import TicketList from "./Components/menu-style/Content/Content"
import {canOpenTicket} from "./Tickets/Ticket"
import {TicketFactory} from "./Tickets/TicketFactory"

// for credential authentication
import Amplify, {Auth} from "aws-amplify"
import awsconfig from "./aws-exports"
import {AmplifySignOut, withAuthenticator, AmplifyAuthenticator, AmplifySignUp} from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// import { FullScreen, useFullScreenHandle } from "react-full-screen";

// function App() {
//   const handle = useFullScreenHandle();

//   return (
//     <div>
//       <button onClick={handle.enter}>
//         Enter fullscreen
//       </button>

//       <FullScreen handle={handle}>
//         Any fullscreen content here
//       </FullScreen>
//     </div>
//   );
// }
// export default App;

Amplify.configure(awsconfig)

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ticket: undefined,
      ticket_information: require('./Tickets/ticket_information.json'), //load json info
      tickets:["network","day","late","airlink"],
      time: ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2),
      passanger: "Kyle Alexander",
      timeLeft: {"hours":0,"minutes":0,"seconds":0},
      switchTimeWithCode: false,
      randomPurchasedDate: createRandomPurchasedDate(),
      // authetnication info
      authState: undefined,
      user: undefined
    }
    // console.log("State in the app class: + ", this.state);
  }

  /*
  If the user has selected a ticket then it will load the ticket else if they are visiting for the first time it
  will display the ticket options
  */
  render() {
    // console.log("Rendering App...");
    // console.log("Selected Ticket", this.state.ticket);
    console.log("user info", Auth.currentUserInfo());
    console.log("user:", this.state.user);
    // sign in
    if (!(this.state.authState === AuthState.SignedIn && this.state.user)){
      return (
        <div>
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
        {/* <AmplifySignOut/> */}
        </div>
    );}
    // choose a ticket
    else if(this.state.ticket === undefined){
      return (
        <div className="Menu Screen">
          <TicketList 
          tickets = {this.state.tickets}
          onClick = {(i) => this.handleClick(i)}
          ticket_information = {this.state.ticket_information}
        />
        {/* <AmplifySignOut /> */}
        </div>
        
      );
    }else{
      // view a ticket
      return (
        <Ticket 
            ticket_current = {this.state.ticket}
            title = {this.state.ticket.title}
            hours_left = { this.state.timeLeft["hours"]}
            minutes_left = { this.state.timeLeft["minutes"]}
            seconds_left = { this.state.timeLeft["seconds"]}
            expiry_date = {this.state.ticket.expiry_date_string}
            purchased_date = {this.state.randomPurchasedDate}
            expiredFunction = {() => this.handleExpired()}
            passanger = {"Karen Alexander"}
            current_time = {this.state.switchTimeWithCode ? this.state.time : "7074"}
        />
      );
    }
  }

  componentDidMount(){
    console.log('Mounting timer');
    const time_delay = 1000; //1000ms
    // set up a timer
    this.timer = setInterval(() => {(this.getTimeandTimeLeft(this.state.ticket, this.handleExpired));}, time_delay);
    // authentication
    // onAuthUIStateChange(
    //   (nextAuthState, authData) => {
    //     this.setState({authState: nextAuthState, user: authData});
    //   });
  }

  componentDidUpdate(){
    // onAuthUIStateChange(
    //   (nextAuthState, authData) => {
    //     this.setState({authState: nextAuthState, user: authData});
    //   });
    return;
  }

  componentWillUnmount(){
    console.log("Unmounting timer");
    clearInterval(this.timer);
    onAuthUIStateChange(
      (nextAuthState, authData) => {
        this.setState({authState: nextAuthState, user: authData});
      });
  }

  /*
  Sets the ticket chosen by the user and will reload the app to display the ticket
  */
  handleClick(idx){
    const ticket_chosen = this.state.tickets[idx]
    // check if we can use this ticket
    const start_time = this.state.ticket_information[ticket_chosen]["availability_start"];
    const end_time =  this.state.ticket_information[ticket_chosen]["availability_end"];
    
    console.log("Ticket chosen was", ticket_chosen);

    if (ticket_chosen === undefined){
      return;
    }

    if (!canOpenTicket(start_time, end_time)){
      alert("Can't open this ticket due to availablity!");
    }else{
      const ticket_object = new TicketFactory().createTicket(this.state.ticket_information[ticket_chosen])
      console.log("Ticket created by factory:", ticket_object);
      this.setState(
        {ticket: ticket_object}
        ); 
    }
    // console.log("Ticket was chosen:", this.state.tickets[idx]);
  }

  /*
  Handles the case when the ticket has expired
  */
  handleExpired(){
    // alert("Ticket has expired!");
    this.setState(
      {ticket: undefined}
    ); 
  }
  
  getTimeandTimeLeft(ticket){
    // console.log("In timer method");
    if (ticket !== undefined){
      const date = new Date();
      const hours_minutes_seconds = ticket.getTimes();
      const current_time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      
      if (ticket.isExpired()){
          console.log("Ticket has expired");
          this.handleExpired();
          return;
      }
      // console.log("Switching time and updating current time");
      this.setState (
        {time: current_time,
        timeLeft: hours_minutes_seconds,
        switchTimeWithCode: !this.state.switchTimeWithCode}  
      );
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

  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
  let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
  let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

  const date_as_string = `${weekday} ${day} ${month} at ${time}`
  return date_as_string;
}

export default App;
