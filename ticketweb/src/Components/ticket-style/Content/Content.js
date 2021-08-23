import React, { useEffect, useState } from "react";
import { ContentWrap } from "./Content.styles";


function Content(props) {
    const ticket = props.ticket_current;
    let hours_minutes_seconds = ticket.getTimes();
    const [timeLeft, setTimeLeft] = useState(ticket.getTimes());
    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(ticket.getTimes());
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
      });

    return (
        <ContentWrap>
            <div className="boxWrap">
                {/* contains all the containers for the icon and the code */}
                <div className="icon_code">
                    <div className="icon">
                        <img src= "assets/images/mticketicon.jpg" alt="ticket Icon"></img>
                    </div>
                    <div className="code_gif">
                        <img src= "assets/images/red_grey_start.gif" alt="red grey gif"></img>
                        <div className="code_text"><b>10:10</b></div>
                    </div>
                </div>

                <div className="timeGrid">
                    <div className="grid-item_text">Hours</div>
                    <div className="grid-item_text">Minutes</div>
                    <div className="grid-item_text">Seconds</div>
                    <div className="grid-item_patch">{timeLeft["hours"]}</div>
                    <div className="grid-item_patch">{timeLeft["minutes"]}</div>
                    <div className="grid-item-seconds">
                        <img src="assets/images/loading2.gif" alt="seconds animation"></img>
                        <div className="second_text">{timeLeft["seconds"]}</div>
                    </div>
                </div>

                <div className="date">
                    Expires on Wed 13th Jan 2019 at 12:22
                </div>

                <div className="ticket">
                    {props.ticket_current.title}
                </div>

                <div className="infoGrid">
                    <div class="grid-info-item-left">Provider</div>
                    <div class="grid-info-item-right">Transport for Edinburgh</div>
                    <div class="grid-info-item-left">Purchased</div>
                    <div class="grid-info-item-right">Wed 30th Jun at 11:46</div>
                    <div class="grid-info-item-left">Passanger</div>
                    <div class="grid-info-item-right">Kyle Alexander</div>
                </div>
            </div>
        </ContentWrap>
    );
}
export default Content;