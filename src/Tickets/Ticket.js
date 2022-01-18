export class Ticket {
    constructor(title, start_date, end_date){
        // console.group(`Creating ticket ${title}`);
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.expiry_date_string = this.getExpiryString(this.end_date);
        this.purchase_date = createRandomPurchasedDate(start_date, 6)
        // console.groupEnd();
    }

    getExpiryString(date){
        // console.log(`Getting ExpiryString for date: ${date}`);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
        let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);
        let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        return `Expires on ${weekday} ${day} ${month} ${year}`
    }

    /*
    Returns the [Hours, minutes, seconds] until the ticket expires
    */
    getTimes(){
        // console.log(`Getting times`);
        // calculate the hours minutes and seconds until availability_end is reached
        const date_now = new Date();
        const date_future = this.end_date;
        let difference =  date_future - date_now;
        // console.log("time difference:", difference);
        // console.log("Date end: ", date_future);
        // console.log("Date start: ", date_now);

        let timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        // console.log(`Time left: ${JSON.stringify(timeLeft)}`);
        return timeLeft;
    }

    /*
    Checks if the ticket is expired, if so then returns true
    */
    isExpired(date_now){
        // console.log(`Checking if ticket is expired with date: ${date_now}`);
        // const date_now = new Date();
        if (date_now > this.end_date){
            // console.log(`Ticket is expired`);
            return true;
        }else{
            // console.log(`Ticket is not expired`);
            return false;
        }
    }


}

/*
Checks if a ticket can be opened
*/
export function getStartEndDate(date_now, availability_start, availability_end){

    // console.info("Getting start and end date with date note", date_now, [availability_start, availability_end]);

    // const date_now = new Date();
    const is_early_morning = isEarlyMorning(date_now, availability_start);

    // console.log("Is early Morning?", is_early_morning);
    
    let hours_mins_end = availability_end.split(':');
    let hours_mins_start = availability_start.split(':');

    let date_end = new Date(date_now);
    let date_start = new Date(date_now);

    if (is_early_morning){
        // date_start = new Date(date_now);
        date_start.setDate(date_start.getDate() - 1);   // set the start date to yesterday
    }else{
        date_end.setDate(date_end.getDate() + 1); // tomorrows date
    }

    // set date end
    date_end.setHours(parseInt(hours_mins_end[0],10));
    date_end.setMinutes(parseInt(hours_mins_end[1],10));
    date_end.setSeconds(0);

    // set date start
    date_start.setHours(parseInt(hours_mins_start[0],10));
    date_start.setMinutes(parseInt(hours_mins_start[1],10));
    date_start.setSeconds(0);

    // console.info("Date end: ", date_end);
    // console.info("Date start: ", date_start);
    // need to check if date_end is greater than date_now
    return [date_start, date_end]
}

export function canOpenTicket(date_now, availability_start, availability_end){
    // console.log(`Checking if ticket can be opened based on start availability: ${availability_start} & end availability: ${availability_end} for date: ${date_now.toISOString()}`)
    // const date_now = new Date();
    const [start_date, end_date] = getStartEndDate(date_now, availability_start, availability_end);
    const can_open =  date_now < end_date && date_now >= start_date;
    // console.log(`Can open: ${can_open}`);
    return can_open;
}

export function isEarlyMorning(today, morning_time){
    // console.log(`Checking if early morning with todays date: ${today} and morning_time: ${morning_time}`);
    // const today = new Date();
    const hour = today.getHours().toString();
    const minute = ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes()).toString();
    
    // concat the times together
    let time = hour+minute;
    time = parseInt(time, 10);

    // get date in morning's minutes and hours
    const [hour_date_in_morning,minute_hour_date_in_morning] = morning_time.split(":");
    let time_morning = hour_date_in_morning + minute_hour_date_in_morning;
    try{
        time_morning = parseInt(time_morning, 10);
    }catch(error){
        // console.error("Error: ", error);
        // console.error("Setting time morning to 530 manually");
        time_morning = 530;
    }
    // check whether the ticket expires today or tomorrow
    if (time >= 0 && time < time_morning){
        // console.log(`It is early morning`);
        return true;
    }else{
        // console.log(`It is not early morning`);
        return false;
    }
}

/*
Gets a random date between todays and 6 months before
*/
function createRandomPurchasedDate(date_1, months_before){
  // console.group(`Creating random date from Date: ${date_1} until ${months_before} months before`);
  date_1.setMonth(date_1.getMonth() - months_before);
  const fromTime = date_1.getTime(); //original date

  const toTime = new Date().getTime(); // date x months ahead
  const date_random = new Date(fromTime + Math.random() * (toTime - fromTime));
  
  // console.debug(`Starting Date: ${date_1.toISOString()}`);
  // console.debug(`End Date: ${new Date().toISOString()}`);

  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date_random);
  let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date_random);
  let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date_random);
  let weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date_random);
  let time = ("0" + date_random.getHours()).slice(-2) + ":" + ("0" + date_random.getMinutes()).slice(-2);

  const date_as_string = `${weekday} ${day} ${month} ${year} at ${time}`
  return date_as_string;
}