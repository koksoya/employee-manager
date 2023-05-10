import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Employee Manager</Typography>
        <Button className={classes.buttonNavbar} component={Link} to="/add">
          Add Employee
        </Button>
        <Button className={classes.buttonNavbar} component={Link} to="/formik">
          Add with Formik
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
