import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { IAddress, IEmployee } from "../types/interfaces";
import Address from "../components/Address";
import { useStyles } from "../styles/styles";
import { Link } from "react-router-dom";

interface IProps {
  onCreateEmployee: (employee: IEmployee) => void;
}

const initialValues: IEmployee = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addresses: [
    {
      streetName: "",
      postalCode: "",
      apartmentNumber: null,
      state: "",
      country: "",
    },
  ],
};

const EmployeeForm: React.FC<IProps> = ({ onCreateEmployee }) => {
  const classes = useStyles();
  const [employee, setEmployee] = React.useState<IEmployee>(initialValues);
  const [addresses, setAddresses] = useState<IAddress[]>(employee.addresses);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const parsedValue = name === "apartmentNumber" ? parseInt(value) : value;
    const newAddresses = [...addresses];

    newAddresses[index] = {
      ...newAddresses[index],
      [name]: parsedValue,
    };
    setAddresses([...newAddresses]);
    setEmployee((prevEmployee) => {
      const newAddresses = [...prevEmployee.addresses];
      newAddresses[index] = {
        ...newAddresses[index],
        [name]: parsedValue,
      };
      return {
        ...prevEmployee,
        addresses: newAddresses,
      };
    });
  };

  function handleAddAddress() {
    setAddresses([...addresses, { ...initialValues.addresses[0] }]);
  }

  function handleRemoveAddress(index: number) {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses([...newAddresses]);
    setEmployee((prevEmployee) => {
      const newAddresses = [...prevEmployee.addresses];
      newAddresses.splice(index, 1);
      return {
        ...prevEmployee,
        addresses: newAddresses,
      };
    });
  }

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Add New Employee
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstName"
              value={employee.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastName"
              value={employee.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={employee.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          {addresses.map((address, index) => (
            <Address
              key={index}
              address={address}
              handleAddressChange={(e) => handleAddressChange(e, index)}
              handleRemoveAddress={() => handleRemoveAddress(index)}
            />
          ))}
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={handleAddAddress}
          >
            Add Address
          </Button>
        </Grid>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => onCreateEmployee(employee)}
        >
          Save
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          component={Link}
          to="/"
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;
