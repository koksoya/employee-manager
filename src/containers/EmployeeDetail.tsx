import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { IAddress, IEmployee } from "../types/interfaces";
import DeleteEmployeeConfirmation from "../components/DeleteEmployeeConfirmation";
import Address from "../components/Address";
import { useStyles } from "../styles/styles";


const initialAddress: IAddress = {
  streetName: "",
  postalCode: "",
  apartmentNumber: null,
  state: "",
  country: "",
};

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
  const [addresses, setAddresses] = useState<IAddress[]>(employee.addresses);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

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

  const handleDeleteConfirmationClose = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmationOpen = () => {
    setIsDeleteConfirmationOpen(true);
  };

  function handleAddAddress() {
    setAddresses([...addresses, { ...initialAddress}]);
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
          onClick={handleDeleteConfirmationOpen}
        >
          Delete
        </Button>
        <DeleteEmployeeConfirmation
          isOpen={isDeleteConfirmationOpen}
          onClose={handleDeleteConfirmationClose}
          onConfirm={() => onDeleteEmployee(employeeProp.id!)}
        />
      </form>
    </Container>
  );
};

export default EmployeeDetails;
