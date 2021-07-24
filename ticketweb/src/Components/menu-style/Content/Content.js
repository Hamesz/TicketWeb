import react from "react";
import { ContentWrap } from "./Content.styles";

function TicketList(props) {
    const ticket_types = props.tickets
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
                        {type + ' Ticket'}
                    </h1>
                    {/* <div className="bodyBox">
                        <div className="times">
                            Availability: 18:30 until 19:30
                        </div>
                        <div className="info">
                            Buses: East Coast
                        </div>
                        <h4>Tap to activate!</h4>
                    </div> */}
                </button>
            )
        }
        </ContentWrap>
    );
}

export default TicketList;
