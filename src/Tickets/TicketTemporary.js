import {Ticket} from "./Ticket"

export class TicketTemporary extends Ticket {

    constructor(title, availability_start, availability_end, start_date, end_date){
        super(title, availability_start, availability_end);
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.expiry_date_string = this.getExpiryString(this.end_date);
    }

}