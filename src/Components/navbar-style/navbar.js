import React from "react";
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar as NavBarBootStrap} from 'react-bootstrap';
import logo from "../../logo.svg"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


const Navbar = ({userLoggedIn, setAuthState, setUser}) => {
  return (
      <NavBarBootStrap bg="dark" variant="dark" expand="sm">
        <NavBarBootStrap.Brand>
          <img src={logo} width="40px" height="40px" />{' '}
          Bus App
        </NavBarBootStrap.Brand>
        <NavBarBootStrap.Toggle />
        <NavBarBootStrap.Collapse>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/info">Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/payment">Payment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <NavBarAuthButton 
                userLoggedIn={userLoggedIn}
                setAuthState={setAuthState}
                setUser={setUser} />
            </Nav.Item>
          </Nav>
        </NavBarBootStrap.Collapse>
      </NavBarBootStrap>
  );
}

const NavBarAuthButton = ({userLoggedIn, setAuthState, setUser}) => {
  if (!userLoggedIn) {
    return (
      <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
    );
  } else {
    return (
      <Nav.Link as={Link} to="/sign-out">Sign out</Nav.Link>
    );
  }
}

export default Navbar;