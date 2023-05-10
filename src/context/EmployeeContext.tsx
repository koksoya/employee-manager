import React, { useState } from "react";
import { IEmployee } from "../types/interfaces";
import { EmployeeAPI } from "../API/EmployeeAPI";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IEmployeeContext {
  employees: IEmployee[];
  setEmployees: (employees: IEmployee[]) => void;
  selectedEmployee: IEmployee | null;
  setSelectedEmployee: (employee: IEmployee | null) => void;
  handleSelectEmployee: (id: number) => void;
  handleUpdateEmployee: (updatedEmployee: IEmployee) => void;
  handleCreateEmployee: (newEmployee: IEmployee) => void;
  handleDeleteEmployee: (id: number) => void;
  handleCreateEmployeeWithFormik: (newEmployee: IEmployee) => void;
}

export const EmployeeContext = createContext<IEmployeeContext>({
  employees: [],
  selectedEmployee: null,
  setSelectedEmployee: () => {},
  setEmployees: () => {},
  handleSelectEmployee: () => {},
  handleUpdateEmployee: () => {},
  handleCreateEmployee: () => {},
  handleDeleteEmployee: () => {},
  handleCreateEmployeeWithFormik: () => {},
});

// eslint-disable-next-line
export default ({ children }: { children: React.ReactNode }) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
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
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployee,
        setSelectedEmployee,
        setEmployees,
        handleSelectEmployee,
        handleUpdateEmployee,
        handleCreateEmployee,
        handleDeleteEmployee,
        handleCreateEmployeeWithFormik,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
