export class Ticket {
    constructor(title, availability_start, availability_end){
        this.title = title;
        this.availability_start = availability_start;
        this.availability_end = availability_end;

        [this.start_date, this.end_date] = getStartEndDate(availability_start, availability_end);
        this.expiry_date_string = this.getExpiryString(this.end_date);
    }

    getExpiryString(date){
        console.log("Getting ExpiryString", date)
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
        let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
        let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        return `Expires on ${weekday} ${day} ${month} ${year} at ${time}`
    }

    /*
    Returns the [Hours, minutes, seconds] until the ticket expires
    */
    getTimes(){
        // calculate the hours minutes and seconds until availability_end is reached
        const date_now = new Date();
        const date_future = this.end_date;
        let difference =  date_future - date_now;
        console.log("time difference:", difference);
        console.log("Date end: ", date_future);
        console.log("Date start: ", date_now);

        let timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };

        return timeLeft;
    }



}

/*
Checks if a ticket can be opened
*/
function getStartEndDate(availability_start, availability_end){

    console.log("Getting start and end date", [availability_start, availability_end]);

    const date_now = new Date();
    const is_early_morning = isEarlyMorning();

    console.log("Is early Morning?", is_early_morning);
    
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
    return [date_start, date_end]
}

export function canOpenTicket(availability_start, availability_end){
    const date_now = new Date();
    const [start_date, end_date] = getStartEndDate(availability_start, availability_end);
    return date_now < end_date && date_now > start_date;
}

function isEarlyMorning(){
    const today = new Date();
    const hour = today.getHours().toString();
    const minute = ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes()).toString();
    
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