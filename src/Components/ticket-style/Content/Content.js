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
                {/* Experiation Date */}
                <div className="date">
                    {props.expiry_date}
                </div>
                
                <TicketDetails
                    title = {props.title}
                    purchased_date = {props.purchased_date}
                    passenger = {props.passanger}
                />
                
            </div>
        </ContentWrap>
    );
}

function LogoAndTime({current_time}){
    return (
        <div>
            {/* contains all the containers for the icon and the code */}
            <div className="icon_code">
                <div className="icon">
                    <img src= "assets/images/mticketicon.jpg" alt="ticket Icon"></img>
                </div>
                <div className="code_gif">
                    <img src= "assets/images/red_grey_start.gif" alt="red grey gif"></img>
                    <div className="code_text"><b>{current_time}</b></div>
                </div>
            </div>
        </div>
    )
}

function TimeLeft({hours_left, minutes_left, seconds_left}){
    return (
        <div>
            <div className="timeGrid">
                <div className="grid-item_text">Hours</div>
                <div className="grid-item_text">Minutes</div>
                <div className="grid-item_text">Seconds</div>
                <div className="grid-item_patch">{hours_left}</div>
                <div className="grid-item_patch">{minutes_left}</div>
                <div className="grid-item-seconds">
                    <img src="assets/images/loading2.gif" alt="seconds animation"></img>
                    <div className="second_text">{seconds_left}</div>
                </div>
            </div>
        </div>
    );
}

function TicketDetails({title, purchased_date, passenger}){
    return (
        <div>
            {/* Ticket Title */}
            <div className="ticket">
                {title}
            </div>
            {/* Passenger Info */}
            <div className="infoGrid">
                <div className="grid-info-item-left">Provider</div>
                <div className="grid-info-item-right">Transport for Edinburgh</div>
                <div className="grid-info-item-left">Purchased</div>
                <div className="grid-info-item-right">{purchased_date}</div>
                <div className="grid-info-item-left">Passenger</div>
                <div className="grid-info-item-right">{passenger}</div>
            </div>
        </div>
    )
}

export default Content;