import React, { Suspense, lazy } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

const EmployeeList = lazy(() => import("./containers/EmployeeList"));
const EmployeeForm = lazy(
  () => import("./containers/EmployeeForm")
);

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeForm />} />
          <Route path="/add" element={<EmployeeForm />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
