import React, { Suspense } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Error from "./containers/Error";
import EmployeeList from "./containers/EmployeeList";
import EmployeeForm from "./containers/EmployeeForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeForm />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
