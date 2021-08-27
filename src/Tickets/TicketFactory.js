import {Ticket} from "./Ticket";
import { TicketTemporary } from "./TicketTemporary";

export class TicketFactory{
    createTicket(ticket_json_object){
        console.log("ticket info duration", ticket_json_object["duration"])
        if (ticket_json_object["duration"] === undefined){
            return this.createStandardTicket(ticket_json_object)
        }else{
            return this.createDurationTicket(ticket_json_object)
        }
    }

    createStandardTicket(ticket_json_object){
        return new Ticket(ticket_json_object["title"], ticket_json_object["availability_start"], ticket_json_object["availability_end"])
    }

    createDurationTicket(ticket_json_object){
        const duration = ticket_json_object["duration"];
        let start = new Date();
        let end = new Date();
        end.setMinutes(end.getMinutes() + parseInt(duration["minutes"],10));

        const end_string = ("0" + end.getHours()).slice(-2) + ":" + ("0" + end.getMinutes()).slice(-2);

        const start_string = ("0" + start.getHours()).slice(-2) + ":" + ("0" + start.getMinutes()).slice(-2);

        console.log("start and end strings as times", [start_string, end_string]);

        return new TicketTemporary(ticket_json_object["title"], start_string, end_string, start, end);
    }
}