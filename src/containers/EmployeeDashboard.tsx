import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { IEmployee } from '../models/employee';
import { EmployeeAPI } from '../API/EmployeeAPI'
import Employee from '../components/Employee';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const EmployeeDashboard: React.FC = () => {
  const classes = useStyles();
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await EmployeeAPI.getAllEmployees();
      setEmployees(data);
    };
    fetchData();
  }, []);

//   const handleAdd = async (employee: IEmployee) => {
//     const newEmployee = await EmployeeAPI.createEmployee(employee);
//     setEmployees([...employees, newEmployee]);
//   };

  const handleUpdate = async (updatedEmployee: IEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    await EmployeeAPI.updateEmployee(updatedEmployee);
    setEmployees(updatedEmployees);
  };

  const handleDelete = async (id: number) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    await EmployeeAPI.deleteEmployee(id);
    setEmployees(updatedEmployees);
  };

  return (
    <div className={classes.root}>
      {/* <Button variant="contained" color="primary" className={classes.button} onClick={handleAdd}>
        Add Employee
      </Button> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Employee table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Firstname</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <Employee
                key={employee.id}
                employee={employee}
                onUpdateEmployee={handleUpdate}
                onDeleteEmployee={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeDashboard;
