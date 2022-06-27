import React from "react";

export const UserData = React.createContext(null);

const UserDataProvider = (props) => {
  return (
    <UserData.Provider
      value={{
        users: [  // users will be used throughout each component , on refresh of page only the elements here will exist (temp data storage)
          {
            name: "Tuka",
            email: "araibi.tuka@gmail.com",
            password: "Password",
            balance: 157,
          },
        ],
        logStatus: {  // setting the login status to be checked throughout the process so it accesses the correct account to deposit and withdraw
          name: "",
          email: "",
          index: null,
          status: false,
        },
      }}
    >
      {props.children}
    </UserData.Provider>
  );
};

export default UserDataProvider;
