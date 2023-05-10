import React, { useContext, useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import { EmployeeAPI } from "../API/EmployeeAPI";

const initialAddress: IAddress = {
  streetName: "",
  postalCode: "",
  apartmentNumber: "",
  state: "",
  country: "",
};

const EmployeeDetails: React.FC = () => {
  const classes = useStyles();
  const {
    selectedEmployee,
    setSelectedEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
  } = useContext(EmployeeContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await EmployeeAPI.getOneEmployee(id!);
      setSelectedEmployee(employee || null);
    };

    if (!selectedEmployee) {
      fetchEmployee();
    }
  }, [id, selectedEmployee, setSelectedEmployee]);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
      setAddresses(selectedEmployee.addresses);
    }
  }, [selectedEmployee]);

  const [employeeProp, setEmployee] = useState<IEmployee | null>(
    selectedEmployee || null
  );
  const [addresses, setAddresses] = useState<IAddress[]>(
    selectedEmployee?.addresses || [initialAddress]
  );
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee!,
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
    setAddresses(newAddresses);
    setEmployee((prevEmployee) => {
      if (!prevEmployee) return null;

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
    setAddresses([...addresses, { ...initialAddress }]);
  }

  function handleRemoveAddress(index: number) {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses([...newAddresses]);
    setEmployee((prevEmployee) => {
      const newAddresses = [...(prevEmployee?.addresses ?? [])];
      newAddresses.splice(index, 1);
      return {
        ...prevEmployee,
        addresses: newAddresses,
      } as IEmployee;
    });
  }

  if (!employeeProp) {
    return (
      <div className={classes.root}>
        <div>Employee not found</div>
        <Button
          className={classes.button}
          variant="outlined"
          component={Link}
          to="/"
        >
          Back to Main Page
        </Button>
      </div>
    );
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
              showRemoveButton={addresses.length > 1}
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
          onClick={() => handleUpdateEmployee(employeeProp)}
        >
          Update
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          component={Link}
          to="/"
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
          onConfirm={() => handleDeleteEmployee(employeeProp.id!)}
        />
      </form>
    </Container>
  );
};

export default EmployeeDetails;
