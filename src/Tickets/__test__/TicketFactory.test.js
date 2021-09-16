import { TicketFactory} from "../TicketFactory";
import {canOpenTicket} from "./Ticket";

test("test opening ticket out of availability ", () => {
    ticket_json_object = {
        title:"test",
        duration: "",
        availability_start: "05:30",
        availability_end: "04:30"
    }
})
const start_date = new Date("2000","01" - 1, "01"); // 2021-01-01
const end_date = new Date("2000","01" - 1, "01");// 2021-01-01
const title = "test";
const ticket = new Ticket(title, start_date, end_date);