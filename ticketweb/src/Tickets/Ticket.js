export class Ticket {
    constructor(title, availability_start, availability_end){
        this.title = title;
        this.availability_start = availability_start;
        this.availability_end = availability_end;

        this.expiry_date = this.getExpiryDate(availability_end)
    }

    /*
    Get the Expiry Date for the ticket given the availability_end
    */
    getExpiryDate(availability_end){
        // split the availability into hours and minutes
        let hours_mins = availability_end.split(':');
        const is_early_morning = isEarlyMorning();
        const today = new Date();

        // check whether the ticket expires today or tomorrow
        let expiry_date;
        if (isEarlyMorning){
            expiry_date = today;
        }else{
            expiry_date = new Date(today)
            expiry_date.setDate(expiry_date.getDate() + 1)
        }
        // set the appropriate hour and minutes
        expiry_date.setHours(parseInt(hours_mins[0],10));
        expiry_date.setMinutes(parseInt(hours_mins[1],10));
        expiry_date.setSeconds(0);

        console.log("Expiry Date for ticket", expiry_date)
        return expiry_date

    }

    /*
    Returns the [Hours, minutes, seconds] until the ticket expires
    */
    getTimes(){
        // calculate the hours minutes and seconds until availability_end is reached
        const date_now = new Date();
        const date_future = this.expiry_date;

        // get total seconds between the times
        let delta = Math.abs(date_future - date_now) / 1000;

        // calculate (and subtract) whole days
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        const seconds = (delta % 60).toFixed(0);  // in theory the modulus is not required

        return [hours, minutes, seconds]
    }



}

/*
Checks if a ticket can be opened
*/
export function canOpenTicket(availability_start, availability_end){
    const date_now = new Date();
    const is_early_morning = isEarlyMorning();

    // console.log("Is early Morning?", is_early_morning);
    
    let hours_mins_end = availability_end.split(':');
    let hours_mins_start = availability_start.split(':');

    let date_end = new Date();
    let date_start = new Date();

    if (is_early_morning){
        date_end = new Date();
        date_start = new Date(date_now);
        date_end.setDate(date_end.getDate() - 1)
    }else{
        date_end = new Date(date_now);
        date_end.setDate(date_end.getDate() + 1)
        date_start = new Date();
    }

    // set date end
    date_end.setHours(parseInt(hours_mins_end[0],10));
    date_end.setMinutes(parseInt(hours_mins_end[1],10));
    date_end.setSeconds(0);

    // set date start
    date_start.setHours(parseInt(hours_mins_start[0],10));
    date_start.setMinutes(parseInt(hours_mins_start[1],10));
    date_start.setSeconds(0);

    console.log("Date end: ", date_end);
    console.log("Date start: ", date_start);
    // need to check if date_end is greater than date_now
    return date_now < date_end && date_now > date_start;
}

function isEarlyMorning(){
    let today = new Date();
    let hour = today.getHours().toString();
    let minute = today.getMinutes().toString();
    
    // concat the times together
    let time = hour+minute;
    time = parseInt(time, 10);

    // check whether the ticket expires today or tomorrow
    if (time >= 0 && time <= 530){
        return true;
    }else{
        return false;
    }
}