import { AppWrap } from '../../App.styles';
import React from 'react';
import Header from "./Header/Header"
import Content from './Content/Content';

function Ticket(props) {
  return (
      <AppWrap>
         <Header 
         ticket_current = {props.ticket_current}
         />
        <Content 
         ticket_current = {props.ticket_current}
         expiredFunction = {props.expiredFunction}
        />
      </AppWrap>
  );
}

export default Ticket;
