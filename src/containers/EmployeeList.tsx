import React, { useCallback, useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Employee from "../components/Employee";
import employeeService from "../services/EmployeeService";
import { IEmployee } from "../types/interfaces";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const subscription = employeeService.employees$.subscribe(
      (updatedEmployees) => {
        setEmployees(updatedEmployees);
      }
    );
    employeeService.initializeEmployees();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleSelectEmployee = useCallback(
    async (id: string) => {
      await employeeService.setSelectedEmployeeById(id);
      navigate(`/employee/${id}`);
    },
    [navigate]
  );

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Employee table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Firstname</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <Employee
                key={employee.id}
                employee={employee}
                onSelectEmployee={handleSelectEmployee}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;
