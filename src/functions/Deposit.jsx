import React from "react";
import {UserData} from "./UserData";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Deposit = () => {
  const uContext = React.useContext(UserData);
  const [deposit, setDeposit] = React.useState("");
  const ErrorMessage = withReactContent(Swal);

  const confirmDeposit = () => {
    if (isNaN(deposit)) { // is it a valid number entered
      ErrorMessage.fire({
        title: "Error",
        html: "Value Entered is not valid",
      });
      setDeposit("");
      return false;
    }

    if (uContext.logStatus.status === false) { // is user logged in
      ErrorMessage.fire({
        title: "Error",
        html: "No user Logged In",
      });
      return false;
    }
    
    if (deposit.includes(" ")) { // make sure number isnt a negative
      ErrorMessage.fire({
        title: "Error",
        html: "Deposit cannot contain spaces"
      });
      setDeposit("");
      return false;
    }

    if (deposit.includes(".")) { // make sure number isnt a negative
      ErrorMessage.fire({
        title: "Error",
        html: "Deposit cannot contain change"
      });
      setDeposit("");
      return false;
    }

    if (deposit < 0) { // make sure number isnt a negative
      ErrorMessage.fire({
        title: "Error",
        html: "Deposit cannot be less than 0",
      });
      setDeposit("");
      return false;
    }
    uContext.users[uContext.logStatus.index].balance = uContext.users[uContext.logStatus.index].balance + parseInt(deposit);
    ErrorMessage.fire({  // success message
      title: "Success",
      html: "Deposited to account successfully",
    });
   
    setDeposit("");
    return true;
  };

  return (
    <>
      <Card 
        bg="success" 
        text="white">
        <Card.Body>
          <>
            Current Account Balance: {""}
            {uContext.logStatus.status ? uContext.users[uContext.logStatus.index].balance : " No user currently logged in"}
            <br/>
            <br/>
            <input
              type="text"
              className="form-control"
              id="deposit"
              placeholder="Enter deposit"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}/>
            <br/>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={confirmDeposit}
              disabled={!deposit ? true : false}>
              Deposit
            </button>
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default Deposit;