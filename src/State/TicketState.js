import Ticket from "../Components/ticket-style/ticket";

export function TicketState(ticket, randomPurchasedDate, handleExpired, user, 
        handleOnClickBackButton, switchTimeWithCode, code){
    const date = new Date();
    const time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    const time_left = ticket.getTimes();
    return (
        <Ticket 
            ticket_current = {ticket}
            title = {ticket.title}
            hours_left = { time_left["hours"] !== 0 ? time_left["hours"] : undefined}
            minutes_left = { time_left["minutes"] !== 0 ? time_left["minutes"] : undefined}
            seconds_left = { time_left["seconds"]}
            expiry_date = {ticket.expiry_date_string}
            purchased_date = {randomPurchasedDate}
            expiredFunction = {() => this.handleExpired()}
            passenger = {user.attributes.name + " " + user.attributes.family_name}
            current_time = {switchTimeWithCode ? time : code}
            onClickBackButton = {() => handleOnClickBackButton()}
        />
    );
}