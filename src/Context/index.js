import React from "react";

const Context = React.createContext({
  searchInputValue: "",
  onchangeSerachInputValue: () => {},
});

export default Context;
