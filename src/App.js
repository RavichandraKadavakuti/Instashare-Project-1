import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Users from "./Components/Users";
import Profile from "./Components/Profile";
import Context from "./Context";
import ProtectedRoutes from "./Components/ProtectedRoutes";

const App = () => {
  const [searchInputValue, setSerachInputValue] = useState("");

  const onchangeSerachInputValue = (value) => {
    setSerachInputValue(value);
  };

  return (
    <Context.Provider
      value={{
        searchInputValue,
        onchangeSerachInputValue,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoutes>
              <Users />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Context.Provider>
  );
};

export default App;
