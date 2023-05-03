import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles/styles";

interface IProps {
  onAddEmployee: () => void;
  onAddEmployeeWithFormik: () => void;
}

const Navbar: React.FC<IProps> = ({onAddEmployee,onAddEmployeeWithFormik}) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Employee Manager</Typography>
        <Button
        className={classes.buttonNavbar}
        onClick={onAddEmployee}
      >
        Add Employee
      </Button>
      <Button
        className={classes.buttonNavbar}
        onClick={onAddEmployeeWithFormik}
      >
        Add Employee with Formik
      </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
