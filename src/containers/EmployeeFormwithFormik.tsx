import React, { useContext } from "react";
import {
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Container,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { Formik, Form, Field, FormikErrors } from "formik";
import * as Yup from "yup";
import { IAddress, IEmployee } from "../types/interfaces";
import { Link } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";

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

const initialValues: IEmployee = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addresses: [
    {
      streetName: "",
      postalCode: "",
      apartmentNumber: "",
      state: "",
      country: "",
    },
  ],
};

const EmployeeFormwithFormik: React.FC = () => {
  const { handleCreateEmployee, employees } = useContext(EmployeeContext);
  const emails = employees.map((employee) => employee.email);
  const classes = useStyles();

  const addressValidationSchema = Yup.object().shape({
    streetName: Yup.string().required("Street name is required"),
    postalCode: Yup.string().required("Postal code is required"),
    apartmentNumber: Yup.number().required("Apartment number is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   email: Yup.string()
  //     .email("Invalid email format")
  //     .required("Email is required")
  //     .test("email-exists", "Email already exists", function (value) {
  //       const isEmailExists = emails.some((email) => email === value);
  //       return !isEmailExists;
  //     }),
  //   phoneNumber: Yup.string().required("Phone number is required"),
  //   addresses: Yup.array()
  //     .of(addressValidationSchema)
  //     .min(1, "At least one address is required"),
  // });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .test("email-exists", "Email already exists", function (value) {
        const isEmailExists = emails.some((email) => email === value);
        return !isEmailExists;
      }),
    phoneNumber: Yup.string().required("Phone Number is required"),
    addresses: Yup.array().of(
      Yup.object().shape({
        streetName: Yup.string().required("Street Name is required"),
        postalCode: Yup.string().required("Postal Code is required"),
        apartmentNumber: Yup.number()
          .typeError("Apartment Number must be a number")
          .required("Apartment Number is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
      })
    ),
  });

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Add New Employee with Validation
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleCreateEmployee(values);
        }}
      >
        {(formik) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                {formik.values.addresses.map(
                  (address: IAddress, index: number) => (
                    <Grid container spacing={2} key={index}>
                      <Grid item xs={12}>
                        <Divider variant="middle" />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h4" variant="h6">
                          Address {index + 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].apartmentNumber`}
                          label="Apartment Number"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.apartmentNumber &&
                            Boolean(
                              (
                                formik.errors
                                  .addresses as FormikErrors<IAddress>[]
                              )[index]?.apartmentNumber
                            )
                          }
                          helperText={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.apartmentNumber &&
                            (
                              formik.errors
                                .addresses as FormikErrors<IAddress>[]
                            )[index]?.apartmentNumber
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].streetName`}
                          label="Street Name"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.streetName &&
                            Boolean(
                              (
                                formik.errors
                                  .addresses as FormikErrors<IAddress>[]
                              )[index]?.streetName
                            )
                          }
                          helperText={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.streetName &&
                            (
                              formik.errors
                                .addresses as FormikErrors<IAddress>[]
                            )[index]?.streetName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].postalCode`}
                          label="Postal Code"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.postalCode &&
                            Boolean(
                              (
                                formik.errors
                                  .addresses as FormikErrors<IAddress>[]
                              )[index]?.postalCode
                            )
                          }
                          helperText={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.postalCode &&
                            (
                              formik.errors
                                .addresses as FormikErrors<IAddress>[]
                            )[index]?.postalCode
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].state`}
                          label="State"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.state &&
                            Boolean(
                              (
                                formik.errors
                                  .addresses as FormikErrors<IAddress>[]
                              )[index]?.state
                            )
                          }
                          helperText={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.state &&
                            (
                              formik.errors
                                .addresses as FormikErrors<IAddress>[]
                            )[index]?.state
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].country`}
                          label="Country"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.country &&
                            Boolean(
                              (
                                formik.errors
                                  .addresses as FormikErrors<IAddress>[]
                              )[index]?.country
                            )
                          }
                          helperText={
                            formik.touched.addresses &&
                            formik.touched.addresses[index]?.country &&
                            (
                              formik.errors
                                .addresses as FormikErrors<IAddress>[]
                            )[index]?.country
                          }
                        />
                      </Grid>
                      <Button
                        className={classes.button}
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          const addresses = [...formik.values.addresses];
                          addresses.splice(index, 1);
                          formik.setFieldValue("addresses", addresses);
                        }}
                      >
                        Remove Address
                      </Button>
                    </Grid>
                  )
                )}
                <Button
                  className={classes.button}
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    formik.setFieldValue("addresses", [
                      ...formik.values.addresses,
                      { streetName: "", postalCode: "", apartmentNumber: "" },
                    ]);
                  }}
                >
                  Add Address
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!formik.dirty || !formik.isValid}
                  className={classes.button}
                >
                  Create
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  component={Link}
                  to="/"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeFormwithFormik;
