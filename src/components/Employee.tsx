import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, TextField, IconButton } from "@material-ui/core";
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
  onUpdateEmployee: (updatedEmployee: IEmployee) => Promise<void>;
  onDeleteEmployee: (id: number) => Promise<void>;
};

const Employee: React.FC<Props> = ({
  employee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<IEmployee>(employee);

  const handleSave = async () => {
    await onUpdateEmployee(updatedEmployee);
    setEditing(false);
  };

  const handleCancel = () => {
    setUpdatedEmployee(employee);
    setEditing(false);
  };

  const handleDeleteClick = async () => {
    await onDeleteEmployee(employee.id);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedEmployee({
      ...updatedEmployee,
      [name]: value,
    });
  };

  const ActionButtons = () => (editing ? (
    <>
      <IconButton className={classes.button} onClick={handleSave}>
        Save
      </IconButton>
      <IconButton className={classes.button} onClick={handleCancel}>
        Cancel
      </IconButton>
    </>
  ) : (
    <>
      <IconButton
        className={classes.button}
        onClick={() => console.log("do something")}
      >
        Details
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={() => setEditing(true)}
      >
        Edit
      </IconButton>
      <IconButton className={classes.button} onClick={handleDeleteClick}>
        Delete
      </IconButton>
    </>
  ));

  return (
    <TableRow>
      <TableCell>{employee.id}</TableCell>
      {editing ? (
        <>
          <TableCell align="center">
            <TextField
              name="firstName"
              value={updatedEmployee.firstName}
              onChange={handleInputChange}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              name="lastName"
              value={updatedEmployee.lastName}
              onChange={handleInputChange}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              name="email"
              value={updatedEmployee.email}
              onChange={handleInputChange}
            />
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="center">{employee.firstName}</TableCell>
          <TableCell align="center">{employee.lastName}</TableCell>
          <TableCell align="center">{employee.email}</TableCell>
        </>
      )}
      <TableCell align="center">
        <ActionButtons />
      </TableCell>
    </TableRow>
  );
};

export default Employee;
