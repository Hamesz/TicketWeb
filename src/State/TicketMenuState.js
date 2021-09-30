import TicketMenu from "../Components/menu-style/menu";

export function TicketMenuState(routes, handleOnClickRoute, ticketOptions, ticketInfo,
        handleTicketClick){
    return (
        <div className="Menu Screen">
          <TicketMenu 
            routes = {routes}
            onClickRoute = {(i) => {handleOnClickRoute(i)}}
            tickets = {ticketOptions}
            onClick = {(i) => handleTicketClick(i)}
            ticket_information = {ticketInfo}
          />
        </div>
      );
}