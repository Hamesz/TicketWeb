import assert from "assert";
import Ticket from "../../Components/ticket-style/ticket";
import { canOpenTicket } from "../Ticket";

/*

*/
test("Test that perfroms ticket can be created successfully", ()=>{
    const start_date = new Date("2000","01" - 1, "01"); // 2021-01-01
    const end_date = new Date("2000","01" - 1, "01");// 2021-01-01
    const title = "test";
    const ticket = new Ticket(title, start_date, end_date);
});

test("open ticket when not available (1)", () => {
    const availability_start = "05:30";
    const availability_end = "04:30";
    const hours = 4;
    const minutes = 30; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, false);
})

test("open ticket when not available (2)", () => {
    const availability_start = "05:30";
    const availability_end = "04:30";
    const hours = 5;
    const minutes = 29; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, false);
})

test("open ticket when available (1)", () => {
    const availability_start = "05:30";
    const availability_end = "04:30";
    const hours = 5;
    const minutes = 30; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, true);
})

test("open ticket when available (2)", () => {
    const availability_start = "05:30";
    const availability_end = "04:30";
    const hours = 4;
    const minutes = 29; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    console.log(`date: ${date.toISOString()}`);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, true);
})

test("open ticket when available (3)", () => {
    const availability_start = "05:30";
    const availability_end = "04:30";
    const hours = 5;
    const minutes = 31; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, true);
})

test("open ticket when available (4)", () => {
    const availability_start = "05:30";
    const availability_end = "05:30";
    const hours = 5;
    const minutes = 31; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, true);
})

test("open ticket not available (5)", () => {
    const availability_start = "05:30";
    const availability_end = "05:30";
    const hours = 5;
    const minutes = 30; 
    const date = new Date("2000","01" - 1, "01", hours, minutes);
    const available = canOpenTicket(date, availability_start, availability_end);
    assert.equal(available, true);
})