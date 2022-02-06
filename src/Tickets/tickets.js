import {TicketFactory} from './TicketFactory';
import "./tickets.css"
import 'bootstrap/dist/css/bootstrap.css';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {canOpenTicket} from "./Ticket";

export default function Tickets({onTicketSelectionClick}) {
  const ticketInformation = require('./ticket_information.json');
  const ticketTypes = Object.keys(ticketInformation);

  return (
    <div className="wrap">
      {
        ticketTypes.map((type, idx) =>
          <Card
            border="light"
            bg={"dark"}
            key={idx}
            text={'white'}
            className="text-center m-1 mb-2 "
            onClick={() => onClick(idx)}>
            <Card.Body>
              <Card.Title style={{fontSize: '26px'}}>
                {ticketInformation[type]["title"]}
              </Card.Title>
              <Card.Text style={{fontSize: '12px'}}>
                {ticketInformation[type]["description"]}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{fontSize: '12px'}}>
              <ListGroupItem>{"Availability: " + ticketInformation[type]["availability_start"] + " until " + ticketInformation[type]["availability_end"]}</ListGroupItem>
            </ListGroup>
          </Card>
        )
      }
    </div>
  );

  function onClick(idx) {
    // check if we can use this ticket
    const start_time = ticketInformation[ticketTypes[idx]]["availability_start"];
    const end_time = ticketInformation[ticketTypes[idx]]["availability_end"];

    if (!canOpenTicket(new Date(), start_time, end_time)) {
      alert("Can't open this ticket due to availability!");
    } else {
      onTicketSelectionClick({
        ticket: TicketFactory.createTicket(ticketInformation[ticketTypes[idx]], new Date())
      });
    }
  }
}