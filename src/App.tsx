import React, { Suspense, lazy } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import FormikForm from "./containers/FormikForm";

const EmployeeList = lazy(() => import("./containers/EmployeeList"));
const EmployeeDetail = lazy(() => import("./containers/EmployeeDetail"));
const EmployeeForm = lazy(() => import("./containers/EmployeeForm"));
const EmployeeFormwithFormik = lazy(
  () => import("./containers/EmployeeFormwithFormik")
);

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/formik" element={<FormikForm />} />
          <Route path="/add" element={<EmployeeForm />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
