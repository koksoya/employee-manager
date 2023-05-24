import React, { Suspense, lazy } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import NotFound from "./containers/NotFound";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
