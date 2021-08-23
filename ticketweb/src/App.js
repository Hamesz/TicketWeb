import { AppWrap } from './App.styles';
import React, {useCallback}  from 'react';
import Ticket from "./Components/ticket-style/ticket"
import TicketList from "./Components/menu-style/Content/Content"
import {canOpenTicket} from "./Tickets/Ticket"
import {TicketFactory} from "./Tickets/TicketFactory"
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

// function App() {
//   return (
//     <TicketList />
//   );
// }


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ticket_current: "None",
      ticket_information: require('./Tickets/ticket_information.json'), //load json info
      tickets:["network","day","late","airlink"]
    }
    console.log("State in the app class: + ", this.state);
  }

  /*
  Renders the view of all possible tickets to choose from (ticket list)
  */
  renderTicketList(props) {
    console.log("Props for render ticket list:", props);
    return (
      <TicketList 
        onClick = {(i) => props.onClick(i)}
        tickets = {props.tickets}
        ticket_information = {props.ticket_information}
      />
    );
  }

  /*
  Renders the view of the actual ticket
  */
  renderTicketView(props){  
    console.log("Props for render ticket view:", props);
    return (
      <Ticket 
      ticket_current = {props.ticket_current}
      expiredFunction = {props.expiredFunction}
      />
    );
  }
  
  /*
  If the user has selected a ticket then it will load the ticket else if they are visiting for the first time it
  will display the ticket options
  */
  render() {
    console.log("Rendering App...");
    console.log("Selected Ticket", this.state.ticket_current);

    // choose a ticket
    if (this.state.ticket_current == "None"){
      console.log("Rendering ticket list");
      const props = {
        tickets: this.state.tickets,
        onClick: (i) => this.handleClick(i),
        ticket_information: this.state.ticket_information,
      }
      return (
        this.renderTicketList(props)
      );
    }else{
        // view a ticket
        console.log("Rendering ticket");
        const props = {
          ticket_current: this.state.ticket_current,
          expiredFunction: () => this.handleExpired()
        }
        return (
          this.renderTicketView(props)
        );
    }
  }

  /*
  Sets the ticket chosen by the user and will reload the app to display the ticket
  */
  handleClick(idx){
    const ticket_chosen = this.state.tickets[idx]
    // check if we can use this ticket
    const start_time = this.state.ticket_information[ticket_chosen]["availability_start"];
    const end_time =  this.state.ticket_information[ticket_chosen]["availability_end"];
    if (!canOpenTicket(start_time, end_time)){
      alert("Can't open this ticket due to availablity!");
    }else{
      const ticket_object = new TicketFactory().createTicket(this.state.ticket_information[ticket_chosen])
      this.setState(
        {ticket_current: ticket_object}
        ); 
    }
    console.log("Ticket was chosen:", this.state.tickets[idx]);
    console.log("Ticket current:", this.state.ticket_current);
  }

  /*
  Handles the case when the ticket has expired
  */
  handleExpired(){
    // alert("Ticket has expired!");
    this.setState(
      {ticket_current: "None"}
    ); 
  }

}

export default App;
