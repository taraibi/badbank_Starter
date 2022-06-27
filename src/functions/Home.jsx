import React from "react";
import {UserData} from "./UserData";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home = () => {
  const uContext = React.useContext(UserData);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [logStatus, setlogStatus] = React.useState(uContext.logStatus.status);
  const ErrorMessage = withReactContent(Swal);

  const Login = () => {
    uContext.users.find((user, index) => {

      if (user.email === email && user.password === password) { // check for valid pass/user
        uContext.logStatus.name = user.name;
        uContext.logStatus.email = user.email;
        uContext.logStatus.index = index;
        uContext.logStatus.status = true;
        return setlogStatus(true);
      }
      return false;
    });

    if (!email || !password) { // check if email or password is blank
      ErrorMessage.fire({
        title: "Error",
        html: "Username/Password is required",
      });
      return false;
    }

    if (uContext.logStatus.status === false) { // if the logged status dosent change error
      ErrorMessage.fire({
        title: "Error",
        html: "Username/password is incorrect",
      });
      return false;
    }



  };

  const Logout = () => {  // set fields to be logged out
    uContext.logStatus.status = false;
    setEmail("");
    setPassword("");
    return setlogStatus(false);
  };

  return (
    <>
        <Card className="bg-secondary text-white text-center">
          <Card.Body>
            <h5>Tuka Bank</h5>
            <br></br>
            {logStatus === true ? `Welcome ${uContext.logStatus.name}` : ""}
            <h4>Welcome, This is Tuka's Bad Bank App</h4>
            <br></br>
            {logStatus === false ? (
              <>
                <input
                  type="input"
                  className="form-control"
                  id="Email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}/>
                <br/>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}/>
                <br/>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={Login}
                  disabled={!email && !password ? true : false}>
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={Logout}>
                  Logout
                </button>
              </>
            )}
          </Card.Body>
          <div>
            <br></br>
            <Card.Img
              variant="bottom"
              src="../bank.png"
              style={{  height: "20rem",
                        width: "20rem", }}/>
          </div>
        </Card>
    </>
  );
};

export default Home;
