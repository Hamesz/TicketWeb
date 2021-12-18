// import React from "react";
import { ContentWrap } from "./Content.styles";

function Content(props) {
    return (
        <ContentWrap>
            <div className="boxWrap">
                <LogoAndTime
                    current_time = {props.current_time}
                />

                <TimeLeft
                    hours_left = {props.hours_left}
                    minutes_left = {props.minutes_left}
                    seconds_left = {props.seconds_left}
                />

                <div className="date">
                    {props.expiry_date}
                </div>

                <TicketDetails
                    title = {props.title}
                />

                <PassengerDetails
                    purchased_date = {props.purchased_date}
                    passenger = {props.passanger}
                />
                
            </div>
        </ContentWrap>
    );
}

function LogoAndTime({current_time}){
    /* contains all the containers for the icon and the code */
    return (
        <div className="icon_code">
            <div className="icon">
                <img src= "assets/images/mticketicon.jpg" alt="ticket Icon"></img>
            </div>
            <div className="code_gif">
                <img src= "assets/images/red_grey_start.gif" alt="red grey gif"></img>
                <div className="code_text"><b>{current_time}</b></div>
            </div>
        </div>
    )
}

function TimeLeft({hours_left, minutes_left, seconds_left}){
    return (
        <table className="a">
            <tr>
                <th><div className="grid-item-text">Hours</div></th>
                <th><div className="grid-item-text">Minutes</div></th>
                <th><div className="grid-item-text">Seconds</div></th>
            </tr>

            <tr>
                <th><div className="grid-item-patch">{hours_left}</div></th>
                <th><div className="grid-item-patch">{minutes_left}</div></th>
                <th><div className="grid-item-seconds">
                        <img src="assets/images/spinner_second_countdown.png" className="rotate" alt="seconds animation"></img>
                        <div className="second-text">{seconds_left}</div>
                    </div>
                </th>
            </tr>

        </table>
    );
}

function TicketDetails({title}) {
    return (
        <div className="ticket">
            {title}
        </div>
    );
}

function PassengerDetails({purchased_date, passenger}){
    return (
        <div className="infoGrid">
            <div className="grid-info-item-left">Provider</div>
            <div className="grid-info-item-right">Transport for Edinburgh</div>
            <div className="grid-info-item-left">Purchased</div>
            <div className="grid-info-item-right">{purchased_date}</div>
            <div className="grid-info-item-left">Passenger</div>
            <div className="grid-info-item-right">{passenger}</div>
        </div>
    );
}

export default Content;