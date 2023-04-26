import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { IAddress, IEmployee } from "../models/employee";

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

interface IEmployeeDetailsProps {
  employee: IEmployee;
  onUnselectEmployee: () => void;
  onUpdateEmployee: (employee: IEmployee) => void;
  onDeleteEmployee: (id: number) => void;
}

const EmployeeDetails: React.FC<IEmployeeDetailsProps> = ({
  employee,
  onUnselectEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const classes = useStyles();
  const [employeeProp, setEmployee] = useState<IEmployee>(employee);
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
      addresses: [address],
    }));
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Employee Info
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
              value={employeeProp.firstName}
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
              value={employeeProp.lastName}
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
              value={employeeProp.email}
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
              value={employeeProp.phoneNumber}
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
          onClick={() => onUpdateEmployee(employeeProp)}
        >
          Update
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={onUnselectEmployee}
        >
          Back
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={() => onDeleteEmployee(employeeProp.id!)}
        >
          Delete
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeDetails;
