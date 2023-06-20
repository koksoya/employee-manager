import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useStyles } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import employeeService from "../services/EmployeeService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleAddEmployeeClicked = () => {
    employeeService.setSelectedEmployee({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            addresses: [
              {
                streetName: "",
                postalCode: "",
                apartmentNumber: 0,
                state: "",
                country: "",
              },
            ],
          });
    navigate("/add");
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Employee Manager</Typography>
        <Button className={classes.buttonNavbar} onClick={handleAddEmployeeClicked} >
          Add Employee
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
