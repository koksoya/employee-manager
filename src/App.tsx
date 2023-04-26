import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeList from "./containers/EmployeeList";
import { IEmployee } from "./models/employee";
import { EmployeeAPI } from "./API/EmployeeAPI";
import EmployeeDetail from "./containers/EmployeeDetail";
import NavBar from "./components/NavBar";

function App() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>();
  const [isAdding, setIsAdding] = useState<boolean>(false);

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
  };

  return (
    <div className="App">
      <NavBar onAddEmployee={handleAdd} />
      {selectedEmployee ? (
        <EmployeeDetail
          employee={selectedEmployee}
          onUnselectEmployee={handleUnselectEmployee}
          onUpdateEmployee={handleUpdateEmployee}
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
