import { AppWrap } from './App.styles';
import React from 'react';
import Ticket from "./Components/ticket-style/ticket"
import TicketList from "./Components/menu-style/Content/Content"

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
      tickets: ['Day', 'Night', 'Live'],
    }
    console.log("State in the app class: + ", this.state);
  }

  renderTicketList(props) {
    console.log("Props for render ticket list:", props);
    return (
      <TicketList 
        onClick = {(i) => props.onClick(i)}
        tickets = {props.tickets}
      />
    );
  }

  renderTicketView(ticket){
    return (
      <Ticket />
    );
  }

  render() {
    const props = {
      tickets: this.state.tickets,
      onClick: (i) => this.handleClick(i),
    }
    console.log("Rendering App...");
    console.log("Selected Ticket", this.state.ticket_current);
    // choose a ticket
    if (this.state.ticket_current == "None"){
      console.log("Rendering ticket list");
      return (
        this.renderTicketList(props)
      );
    }else{
      // view a ticket
      console.log("Rendering ticket");
      return (
        this.renderTicketView(this.state.ticket_current)
      );
    }
  }

  handleClick(idx){
    const ticket_chosen = this.state.tickets[idx]
    this.setState(
      {ticket_current: ticket_chosen}
      ); 
    console.log("Ticket was chosen:", this.state.tickets[idx]);
    console.log("Ticket current:", this.state.ticket_current);
  }

}

export default App;
