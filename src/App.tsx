import React from "react";
import "./App.css";
import NavBar from "./app/layout/NavBar";
import EmployeeDashboard from "./containers/EmployeeDashboard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <EmployeeDashboard />
    </div>
  );
}

export default App;
