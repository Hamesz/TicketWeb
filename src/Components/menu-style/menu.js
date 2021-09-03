import { AppWrap } from '../../App.styles';
import React from 'react';
import Navigation from "../navigation-style/Navigation"
import Content from './Content/Content';

function TicketMenu(props) {
    // console.log("Props in TicketMenu", props);
    return (
        <AppWrap>
           <Navigation
                routes = {props.routes}
                onClickRoute = {(idx) => {props.onClickRoute(idx)}}
           />
          <Content 
                tickets = {props.tickets}
                ticket_information = {props.ticket_information}
                onClick = {(idx) => {props.onClick(idx)}}
          />
        </AppWrap>
    );
}

export default TicketMenu;