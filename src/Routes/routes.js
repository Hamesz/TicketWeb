import React from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";

import Navbar from "../Navbar/navbar"
import Info from "../Info/info"
import Payment from "../Payment/payment";
import SignIn from "../Authentication/signIn";
import Tickets from "../Tickets/tickets"
import Ticket from "../Ticket/ticket"

export default function AppRoutes({user, userLoggedIn, paid, code}) {

  const [ticket, setTicket] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/ticket')
  }, [ticket])

  return (
    <Routes>
      <Route element={<WithNavbar userLoggedIn={userLoggedIn} />} >
        <Route path="/home" element = {<Info />} />
        <Route path="/payment" element = { getPayment() } />
        <Route path="/tickets" element = { getTickets() } />
        <Route path="/sign-in" element = { getSignIn() } />
      </Route>

      <Route elememt={<WithoutNavbar />}>
      <Route path="/ticket" element = { getTicket() }/>
      </Route>
    </Routes>
  );

  function onTicketSelectionClick({ticket}) {
    setTicket(ticket);
  }

  function getPayment() {
    if (!userLoggedIn) {
      return <Navigate to="/sign-in"/>;
    } else {
      return <Payment 
        user={user} />;
    }
  }

  function getTickets() {
    if (!paid) {
      return getPayment();
    } else {
      return <Tickets onTicketSelectionClick={(data) => onTicketSelectionClick(data)}/>;
    }
  }

  function getSignIn() {
    if (userLoggedIn) {
      return <Navigate to="/home"/>;
    } else {
      return <SignIn/>;
    }
  }

  function getTicket() {
    if (!paid) {
      return getPayment();
    } else {
      return <Ticket
        user={user}
        ticket={ticket}
        date={new Date()}
        code={code}/>;
    }
  }

}

function WithoutNavbar() {
  return (
    <Outlet />
  );
}

function WithNavbar({userLoggedIn}) {
  return (
    <>
      <Navbar userLoggedIn={userLoggedIn} />
      <Outlet />
    </>
  )
}

