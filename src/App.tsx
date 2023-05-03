import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeList from "./containers/EmployeeList";
import { IEmployee } from "./types/interfaces";
import { EmployeeAPI } from "./API/EmployeeAPI";
import EmployeeDetail from "./containers/EmployeeDetail";
import NavBar from "./components/NavBar";
import EmployeeForm from "./containers/EmployeeForm";
import EmployeeFormwithFormik from "./containers/EmployeeFormwithFormik";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await EmployeeAPI.getAllEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  const handleSelectEmployee = (id: number) => {
    const selectedEmployee = employees.find((employee) => employee.id === id);
    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
    }
    navigate(`/employee/${id}`);
  };

  const handleUpdateEmployee = async (updatedEmployee: IEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    await EmployeeAPI.updateEmployee(updatedEmployee);
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
    navigate("/");
  };

  const handleCreateEmployee = async (newEmployee: IEmployee) => {
    const createdEmployee = await EmployeeAPI.createEmployee(newEmployee);
    setEmployees([...employees, createdEmployee]);
    navigate("/");
  };

  const handleCreateEmployeeWithFormik = async (newEmployee: IEmployee) => {
    const createdEmployee = await EmployeeAPI.createEmployee(newEmployee);
    setEmployees([...employees, createdEmployee]);
    navigate("/");
  };

  const handleDeleteEmployee = async (id: number) => {
    await EmployeeAPI.deleteEmployee(id);
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
    navigate("/");
  };

  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeList
                employees={employees}
                onSelectEmployee={handleSelectEmployee}
              />
            }
          />
          <Route
            path="/employee/:id"
            element={
              <EmployeeDetail
                employee={selectedEmployee!}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            }
          />
          <Route
            path="/formik"
            element={
              <EmployeeFormwithFormik
                emails={employees.map((employee) => employee.email)}
                onCreateEmployee={handleCreateEmployeeWithFormik}
              />
            }
          />
          <Route
            path="/add"
            element={<EmployeeForm onCreateEmployee={handleCreateEmployee} />}
          />
        </Routes>
    </div>
  );
}

export default App;
