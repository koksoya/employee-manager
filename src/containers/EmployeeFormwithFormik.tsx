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
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  addresses: Yup.array().of(
    Yup.object({
      streetName: Yup.string().required("Street name is required"),
      postalCode: Yup.string().required("Postal code is required"),
      apartmentNumber: Yup.number().required("Apartment number is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
    })
  ),
});

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

const EmployeeFormwithFormik: React.FC<IProps> = ({
  onCreateEmployee,
  onCancel,
}) => {
  const classes = useStyles();
  const [employee, setEmployee] = React.useState<IEmployee>(initialValues);
  const [address, setAddress] = useState<IAddress>(employee.addresses[0]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onCreateEmployee(values);
    },
  });

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
      addresses: [{ ...address, [name]: parsedValue }],
    }));
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Add New Employee with Validation
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onCreateEmployee(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
              <Field
                  as={TextField}
                  name="apartmentNumber"
                  label="Street Number"
                  variant="outlined"
                  fullWidth
                  error={touched.addresses && Boolean(touched.addresses)}
                  helperText={touched.addresses && errors.addresses}
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeFormwithFormik;
