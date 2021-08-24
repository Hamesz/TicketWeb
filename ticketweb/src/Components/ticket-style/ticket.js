import { AppWrap } from '../../App.styles';
import React from 'react';
import Header from "./Header/Header"
import Content from './Content/Content';

function Ticket(props) {
  return (
      <AppWrap>
         <Header 
         title = {props.title}
         />
        <Content 
         title = {props.title}
         hours_left = {props.hours_left}
         minutes_left = {props.minutes_left}
         seconds_left = {props.seconds_left}
         expiry_date = {props.expiry_date}
         purchased_date = {props.purchased_date}
         expiredFunction = {() => props.expiredFunction()}
         passanger = {props.passanger}
         current_time = {props.current_time}
        />
      </AppWrap>
  );
}

export default Ticket;
