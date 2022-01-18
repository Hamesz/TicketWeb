import React from "react";
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar as NavBarBootStrap, NavDropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify"

export default function Navbar({userLoggedIn}) {
  return (
      <NavBarBootStrap collapseOnSelect bg="dark" variant="dark" expand="sm">
        <NavBarBootStrap.Brand>
          <img src="app_icon.png" width="40px" height="40px" alt="logo" className="m-1"/>{' '}
          Bus App
        </NavBarBootStrap.Brand>
        <NavBarBootStrap.Toggle className="m-1"/>
        <NavBarBootStrap.Collapse>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link as={Link} to="/home" eventKey="2">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/payment" eventKey="3">Payment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/tickets" eventKey="4">Tickets</Nav.Link>
            </Nav.Item>
            <NavDropdown.Divider />
            <Nav.Item bg="red">
              <NavBarAuthButton 
                userLoggedIn={userLoggedIn} />
            </Nav.Item>
          </Nav>
        </NavBarBootStrap.Collapse>
      </NavBarBootStrap>
  );

}

const NavBarAuthButton = ({userLoggedIn}) => {
  if (!userLoggedIn) {
    return (
      <Nav.Link bg="red" as={Link} to="/sign-in" eventKey="5"><b>Sign In</b></Nav.Link>
    );
  } else {
    return (
      <Nav.Link as={Link} to="/home" eventKey="5" onClick={() => signout()}><b>Sign Out</b></Nav.Link>
    );
  }
}

function signout() {
  Auth.signOut()
    .then()
    .catch(err => console.error(err));
}