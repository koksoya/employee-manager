import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button } from "@material-ui/core";
import { IEmployee } from "../models/employee";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

type Props = {
  employee: IEmployee;
  onSelectEmployee: (id: number) => void;
};

const Employee: React.FC<Props> = ({ employee, onSelectEmployee }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>
      <>
        <TableCell align="center">{employee.firstName}</TableCell>
        <TableCell align="center">{employee.lastName}</TableCell>
        <TableCell align="center">{employee.email}</TableCell>
      </>
      <TableCell align="center">
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => onSelectEmployee(employee.id)}
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Employee;
