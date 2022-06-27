import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const NavBar = () => {
  const [activeNav, setActiveNav] = React.useState(0);
  
  const link = ["Home", "Create Account", "Deposit", "Withdraw", "AllData"];
  const links = ["#/","#/createaccount","#/deposit","#/withdraw","#/alldata",]; //stores all pages for map to create each link

  return (
    <>
      <Navbar  
        bg="secondary" 
        variant="light">
          <Navbar.Brand>
          <img src="./bank.png" width="27px"></img>
            BadBank
          </Navbar.Brand>
            <Nav
              activeKey={activeNav}
              onSelect={(selectedKey) => setActiveNav(selectedKey)}>
              {link.map( // creates all navigatoin based off link list/container
                (link, i) => (
                  <OverlayTrigger
                    key={link}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`${link}`}>{link} link</Tooltip>}>
                    <Nav.Link href={links[i]} eventKey={i}>{link}</Nav.Link>
                  </OverlayTrigger>
                )
              )}
            </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
