import {Ticket} from "./Ticket";

export class TicketFactory{
    createTicket(ticket_json_object){
        return new Ticket(ticket_json_object["title"], ticket_json_object["availability_start"], ticket_json_object["availability_end"])
    }
}