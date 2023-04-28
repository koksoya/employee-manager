import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeList from "./containers/EmployeeList";
import { IEmployee } from "./types/interfaces";
import { EmployeeAPI } from "./API/EmployeeAPI";
import EmployeeDetail from "./containers/EmployeeDetail";
import NavBar from "./components/NavBar";
import EmployeeForm from "./containers/EmployeeForm";
import EmployeeFormwithFormik from "./containers/EmployeeFormwithFormik";

function App() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isAddingWithFormik, setIsAddingWithFormik] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await EmployeeAPI.getAllEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

  const handleSelectEmployee = (id: number) => {
    const employee = employees.find((employee) => employee.id === id);
    if (employee) {
      setSelectedEmployee(employee);
    }
  };

  const handleUnselectEmployee = () => {
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = async (updatedEmployee: IEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    await EmployeeAPI.updateEmployee(updatedEmployee);
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setSelectedEmployee(null);
  };

  const handleAddWithFormik = () => {
    setIsAddingWithFormik(true);
    setSelectedEmployee(null);
  };

  const handleCreateEmployee = async (newEmployee: IEmployee) => {
    const createdEmployee = await EmployeeAPI.createEmployee(newEmployee);
    setEmployees([...employees, createdEmployee]);
    setIsAdding(false);
  };

  const handleCreateEmployeeWithFormik = async (newEmployee: IEmployee) => {
    const createdEmployee = await EmployeeAPI.createEmployee(newEmployee);
    setEmployees([...employees, createdEmployee]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleCancelWithFormik = () => {
    setIsAddingWithFormik(false);
  };

  const handleDeleteEmployee = async (id: number) => {
    await EmployeeAPI.deleteEmployee(id);
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
  };

  return (
    <div className="App">
      <NavBar onAddEmployee={handleAdd} onAddEmployeeWithFormik={handleAddWithFormik} />
      {selectedEmployee ? (
        <EmployeeDetail
          employee={selectedEmployee}
          onUnselectEmployee={handleUnselectEmployee}
          onUpdateEmployee={handleUpdateEmployee}
          onDeleteEmployee={handleDeleteEmployee}
        />
      ) : isAdding ? (
        <EmployeeForm
          onCreateEmployee={handleCreateEmployee}
          onCancel={handleCancel}
        />
      ) : isAddingWithFormik ? (
        <EmployeeFormwithFormik
          onCreateEmployee={handleCreateEmployeeWithFormik}
          onCancel={handleCancelWithFormik}
        />
      ) : (
        <EmployeeList
          employees={employees}
          onSelectEmployee={handleSelectEmployee}
        />
      )}
    </div>
  );
}

export default App;
