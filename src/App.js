import React from "react";
import { HashRouter, Route } from "react-router-dom";
import NavBar from "./functions/navigation";
import Home from "./functions/Home";
import CreateAccount from "./functions/CreateAccount";
import Deposit from "./functions/Deposit";
import Withdraw from "./functions/Withdraw";
import AllData from "./functions/AllData";
import UserDataProvider from "./functions/UserData";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
      <HashRouter>
        <NavBar />
        <UserDataProvider>
          <div className="container" >
            <br></br>
            <br></br>
            <br></br>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" exact component={CreateAccount} />
            <Route path="/Deposit/" exact component={Deposit} />
            <Route path="/Withdraw/" exact component={Withdraw} />
            <Route path="/AllData/" exact component={AllData} />
          </div>
        </UserDataProvider>
      </HashRouter>
  );
}

export default App;
