import react from "react";
import { ContentWrap } from "./Content.styles";

function TicketList(props) {
    const ticket_types = props.tickets
    const ticket_information = props.ticket_information

    console.log("ticket info", ticket_information);
    return (
        <ContentWrap>
        {
            ticket_types.map((type, idx) => 
                <button 
                    className="ticketView" 
                    key={idx}
                    onClick={() => props.onClick(idx)}
                >
                    <h1>
                        {ticket_information[type]["title"]}
                    </h1>
                    <div className="bodyBox">
                        <div className="times">
                            {"Availability: " + ticket_information[type]["availability_start"] + " until " + ticket_information[type]["availability_end"]}
                        </div>
                        <div className="info">
                            {"Destinations: " + ticket_information[type]["destinations"]}
                        </div>
                        <h5>Tap to activate!</h5>
                    </div>
                </button>
            )
        }
        </ContentWrap>
    );
}

export default TicketList;
