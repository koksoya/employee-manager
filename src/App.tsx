import React, { useEffect, useState } from "react";
import { fetchEmployees, Employee } from "./api";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await fetchEmployees();
      setEmployees(response);
    };
    getEmployees();
  }, []);

  return (
    <div className="App">
      {employees.map((e) => (
        <div key={e.id}>
          <div>{e.firstName} {e.lastName}</div>
          <div>{e.email}</div>
          <div>{e.phoneNumber}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
