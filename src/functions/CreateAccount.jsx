import React from "react";
import {UserData} from "./UserData";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const CreateAccount = () => {
  const [AddAnother, setAddAnother] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const uContext = React.useContext(UserData);
  const ErrorMessage = withReactContent(Swal);

  function clearAllData() { //clears the form when adding a new user or on page load
    setName("");
    setEmail("");
    setPassword("");
    setAddAnother(true);
  }

  function accountCreation() {  //checks for errors before pushing the user
    if (!checkForErrors(name, "name")) return;
    if (!checkForErrors(email, "email")) return;
    if (!checkForErrors(password, "password")) return;
    uContext.users.push({ name, email, password, balance: 77 });
    setAddAnother(false);
  }

  function checkForErrors(field, label) {
      if (label === "password"  && password.length < 8) {  // fire off a error message if password is not length of 8 or greater
        ErrorMessage.fire({
          title: "Error",
          html: "password must be at least 8 characters long",
        });
        return false;
      }

      if(!field){
      ErrorMessage.fire({  //fire off message if a field has no entry
        title: "Error",
        html: `${label} is required`,
      });
      return false;
    }
    
    return true;
  }


  return (
    <>
      <Card 
        bg="info" 
        text="white">
        <Card.Body>
          {AddAnother ? (
            <>
              Your Name
              <input
                type="input"
                className="form-control"
                id="user"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}/>
                
              Password
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}/>

              Email
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)} />
              <br/>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={accountCreation}
                disabled={!name && !email && password.length < 8 ? true : false}>
                Create Account
              </button>
            </>
          ) : (
            <>
              <h3>Account Successfully Created</h3>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={clearAllData}>
                Create another account
              </button>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateAccount;
