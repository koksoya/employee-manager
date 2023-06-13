import React, { useContext } from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { Link } from "react-router-dom";
import {EmployeeContext} from "../context/EmployeeContext";

const Navbar: React.FC = () => {
  const { handleUnselectEmployee } = useContext(EmployeeContext);

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Employee Manager</Typography>
        <Button className={classes.buttonNavbar} component={Link} to="/add" onClick={handleUnselectEmployee} >
          Add Employee
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
