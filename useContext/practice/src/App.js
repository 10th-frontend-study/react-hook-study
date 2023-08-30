import React, { useState } from "react";
import './App.css';
import Page from "./Components/Page";
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";

function App() {
  const [isDart, setIsDark] = useState(false);
  return (

    <UserContext.Provider value={'사용자'}>
        <></>
      <ThemeContext.Provider value={{ isDart, setIsDark }}>
        <Page/>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;