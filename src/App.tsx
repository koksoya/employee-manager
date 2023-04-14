import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Employee } from "./models/employee";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios
      .get<Employee[]>("https://procom-interview-employee-test.azurewebsites.net/employee")
      .then((response) => setEmployees(response.data));
  }, []);

  return (
    <div className="App">
      {employees.map((e) => (
        <div key={e.id}>
          <div>
            {e.firstName} {e.lastName}
          </div>
          <div>{e.email}</div>
          <div>{e.phoneNumber}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
