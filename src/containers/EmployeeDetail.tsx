import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Container,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core';
import { IEmployee } from '../models/employee';
import { EmployeeAPI } from '../API/EmployeeAPI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

interface RouteParams {
  id: string;
}

const EmployeeDetails: React.FC <IEmployee> = (employeeProp: IEmployee) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState<IEmployee>(employeeProp);

  const handleSave = async() => {
    // Update employee data on API
    await EmployeeAPI.updateEmployee(employee).then();
    navigate('/');
    
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddressChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    // setEmployee(prevEmployee => ({
    //   ...prevEmployee,
    //   addresses: prevEmployee.addresses.map((address, i) =>
    //     i === index ? { ...address, [name]: value } : address
    //   ),
    // }));
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Edit Employee
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
              name="firstname"
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
              name="lastname"
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
              value={employee.addresses[0]}
              />
            </Grid>
            </Grid>
            </form>
            </Container>
            )
  }

  export default EmployeeDetails;
