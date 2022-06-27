import React from "react";
import {UserData} from "./UserData";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Withdraw = () => {
  const uContext = React.useContext(UserData);
  const [withdraw, setWithdraw] = React.useState("");
  const ErrorMessage = withReactContent(Swal);

  const confirmWithdraw = () => {
    if (isNaN(withdraw)) {  // is it a valid number entered
      ErrorMessage.fire({
        title: "Error",
        html: "Withdrawal amount must be a number",
      });
      setWithdraw("");
      return false;
    }

    if (uContext.logStatus.status === false) { // is user logged in
      ErrorMessage.fire({
        title: "Error",
        html: "No user Logged In",
      });
      return false;
    }

    if (withdraw < 0) { // cant withdraw nothing
      ErrorMessage.fire({
        title: "Error",
        html: "Withdrawal amount cannot be less than 0",
      });
      setWithdraw("");
      return false;
    }

    if (withdraw.includes(" ")) { // cant have a space
      ErrorMessage.fire({
        title: "Error",
        html: "withdraw cannot contain spaces"
      });
      setWithdraw("");
      return false;
    }

    if (withdraw.includes(".")) { // bank doesnt allow change
      ErrorMessage.fire({
        title: "Error",
        html: "withdraw amount cannot include change"
      });
      setWithdraw("");
      return false;
    }
    
    if (uContext.users[uContext.logStatus.index].balance < withdraw) { //  cannot withdraw more than you have
      ErrorMessage.fire({
        title: "Error",
        html: "You cannot withdraw more money than your balance Your Current balance is $" + uContext.users[uContext.logStatus.index].balance,
      });
      setWithdraw("");
      return false;
    }

    uContext.users[uContext.logStatus.index].balance =uContext.users[uContext.logStatus.index].balance - withdraw;
    setWithdraw("");
    ErrorMessage.fire({
      title: "Success",
      html: "Withdrawn from account successfully",
    });
    return true;
  };

  return (
    <>
      <Card 
        bg="danger" 
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
              id="withdraw"
              placeholder="Enter Withdraw Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}/>
            <br/>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={confirmWithdraw}
              disabled={!withdraw ? true : false}>
              Withdraw
            </button>
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default Withdraw;
