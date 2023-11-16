import React, { useState } from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";

import Login from "./Components/Login";
import Home from "./Components/Home";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Context from "./Context";

const App = () => {
  const [searchInputValue, setSerachInputValue] = useState("");

  const onchangeSerachInputValue = (value) => {
    setSerachInputValue(value);
  };

  return (
    <Switch>
      <Context.Provider
        value={{
          searchInputValue,
          onchangeSerachInputValue,
        }}
      >
        <Route exact path="/login" component={Login} />
        <ProtectedRoutes exact path="/" component={Home} />
        <ProtectedRoutes exact path="/users/:id" component={Users} />
        <ProtectedRoutes exact path="/profile" component={Profile} />
      </Context.Provider>
    </Switch>
  );
};

export default App;
