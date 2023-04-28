import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { IAddress, IEmployee } from "../types/interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(3, 1, 2),
    },
  })
);

interface IProps {
  onCreateEmployee: (employee: IEmployee) => void;
  onCancel: () => void;
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
      apartmentNumber: 0,
      state: "",
      country: "",
    },
  ],
};



const EmployeeForm: React.FC<IProps> = ({ onCreateEmployee, onCancel }) => {
  const classes = useStyles();
  const [employee, setEmployee] = React.useState<IEmployee>(initialValues);
  const [address, setAddress] = useState<IAddress>(employee.addresses[0]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = name === "apartmentNumber" ? parseInt(value) : value;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: parsedValue,
    }));
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      addresses: [{...address, [name]: parsedValue}],
    }));
  };

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
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="apartmentNumber"
              label="Number"
              name="apartmentNumber"
              value={address.apartmentNumber}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="street"
              label="Street"
              name="streetName"
              value={address.streetName}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="state"
              label="State"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
            />
          </Grid>
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
          onClick={onCancel}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;
