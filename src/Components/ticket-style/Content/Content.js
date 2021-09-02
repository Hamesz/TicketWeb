// import React from "react";
import { ContentWrap } from "./Content.styles";

function Content(props) {
    // const ticket = props.ticket_current;
    // const expiredFunction = props.expiredFunction
    // const [[timeLeft, current_time, expired], setTimeLeft] = useState(getTimeandTimeLeft(ticket, expiredFunction));
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       setTimeLeft(getTimeandTimeLeft(ticket));
    //     }, 1000);
    //     // Clear timeout if the component is unmounted
    //     return () => clearTimeout(timer);
    //   });
    
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
                        <div className="code_text"><b>{props.current_time}</b></div>
                    </div>
                </div>

                <div className="timeGrid">
                    <div className="grid-item_text">Hours</div>
                    <div className="grid-item_text">Minutes</div>
                    <div className="grid-item_text">Seconds</div>
                    <div className="grid-item_patch">{props.hours_left}</div>
                    <div className="grid-item_patch">{props.minutes_left}</div>
                    <div className="grid-item-seconds">
                        <img src="assets/images/loading2.gif" alt="seconds animation"></img>
                        <div className="second_text">{props.seconds_left}</div>
                    </div>
                </div>

                <div className="date">
                    {props.expiry_date}
                </div>

                <div className="ticket">
                    {props.title}
                </div>

                <div className="infoGrid">
                    <div className="grid-info-item-left">Provider</div>
                    <div className="grid-info-item-right">Transport for Edinburgh</div>
                    <div className="grid-info-item-left">Purchased</div>
                    <div className="grid-info-item-right">{props.purchased_date}</div>
                    <div className="grid-info-item-left">Passenger</div>
                    <div className="grid-info-item-right">{props.passanger}</div>
                </div>
            </div>
        </ContentWrap>
    );
}
export default Content;