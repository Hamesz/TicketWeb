import { AppWrap } from '../../App.styles';
import React from 'react';
import Header from "./Header/Header"
import Content from './Content/Content';

function Ticket(ticket) {
  return (
      <AppWrap>
         <Header />
        <Content />
      </AppWrap>
  );
}

export default Ticket;
