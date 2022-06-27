import React from "react";
import {UserData} from "./UserData";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function AllData() {
  const uContext = React.useContext(UserData);
  let add = true;
  
  return (
    <>
    <Card 
      bg="secondary" 
      text="white">
        <Card.Header>
          <Row>
            <Col>Name:</Col>
            <Col>Username/Email:</Col>
            <Col>Passwords:</Col>
            <Col>Bank Account Balance:</Col>
            </Row>
        </Card.Header>
        <Container>
          {uContext.users.map((user, index) => {
            add = !add;
              return (
                <Row key={index} className={add ? "bg-white text-dark" : "bg-light text-dark"}>
                  <Col>{user.name}</Col>                  
                  <Col>{user.email}</Col>
                  <Col>{user.password}</Col>
                  <Col>{user.balance}</Col>
                </Row>);})}
          </Container> 
      </Card>
    </>
  );
}

export default AllData;
