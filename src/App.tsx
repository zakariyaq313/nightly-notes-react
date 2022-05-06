import React from "react";
import Navigation from "./components/Common/Navigation";
import HomePage from "./components/Pages/Home";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HomePage />
    </div>
  );
}

export default App;
