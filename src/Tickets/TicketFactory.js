import {Ticket, getStartEndDate} from "./Ticket";
import { TicketTemporary } from "./TicketTemporary";

export class TicketFactory{
    createTicket(ticket_json_object){
        console.group("Creating a ticket using the factory for object: $",ticket_json_object);
        let ticket;
        if (ticket_json_object["duration"] === undefined){
            ticket =  this.createStandardTicket(ticket_json_object)
        }else{
            ticket = this.createDurationTicket(ticket_json_object)
        }
        console.info(`ticket created: ${JSON.stringify(ticket)}`);
        console.groupEnd();
        return ticket;
    }

    createStandardTicket(ticket_json_object){
        const [start_date, end_date] = getStartEndDate(ticket_json_object["availability_start"], ticket_json_object["availability_end"])
        console.log(`Creating normal ticket with object. Start date: ${start_date}, End date: ${end_date}`);
        return new Ticket(ticket_json_object["title"], start_date, end_date);
    }

    createDurationTicket(ticket_json_object){
        const duration = ticket_json_object["duration"];
        let start_date = new Date();
        let end_date = new Date();
        end_date.setMinutes(end_date.getMinutes() + parseInt(duration["minutes"],10));
        console.log(`Creating duration ticket with object. Start date: ${start_date}, End date: ${end_date}`);
        return new TicketTemporary(ticket_json_object["title"],start_date, end_date);
    }


}

