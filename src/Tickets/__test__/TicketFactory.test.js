import {TicketFactory} from "../TicketFactory";

test("test opening ticket regular ticket ", () => {
    const ticket_json_object = {
        title:"test",
        availability_start: "05:30",
        availability_end: "04:30"
    }
    const date_now = new Date("2000","01" - 1, "01"); // 2021-01-01
    const ticket = TicketFactory.createTicket(ticket_json_object, date_now);
    
})

test("test opening ticket duration ticket ", () => {
    const ticket_json_object = {
        title:"test",
        duration : { minutes: "5" },
        availability_start: "05:30",
        availability_end: "04:30"
    }
    const date_now = new Date("2000","01" - 1, "01"); // 2021-01-01
    const ticket = TicketFactory.createTicket(ticket_json_object, date_now);
})