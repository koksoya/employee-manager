import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IAddress } from "../types/interfaces";
import { useParams } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import DeleteEmployeeConfirmation from "../components/DeleteEmployeeConfirmation";
import { EmployeeAPI } from "../API/EmployeeAPI";
import { useStyles } from "../styles/styles";

const EmployeeFormwithFormik: React.FC = () => {
  const {
    handleCreateEmployee,
    handleUnselectEmployee,
    handleDeleteEmployee,
    handleUpdateEmployee,
    employees,
    selectedEmployee,
    setSelectedEmployee,
  } = useContext(EmployeeContext);
  const emails = employees.map((employee) => employee.email);
  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await EmployeeAPI.getOneEmployee(id!);
      setSelectedEmployee(employee || null);
    };

    if (!selectedEmployee && id) {
      fetchEmployee();
    }
  }, [id, selectedEmployee, setSelectedEmployee]);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .test("email-exists", "Email already exists", function (value) {
        const isEmailExists = emails.some(
          (email) => email === value && email !== selectedEmployee?.email
        );
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

  const handleDeleteConfirmationClose = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmationOpen = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const parseApartmentNumber = (value: string) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Add New Employee
      </Typography>
      <Formik
        enableReinitialize
        initialValues={
          selectedEmployee || {
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
          }
        }
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (id) {
            handleUpdateEmployee(values);
          } else {
            handleCreateEmployee(values);
          }
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
                />
                <ErrorMessage name="firstName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="lastName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="phoneNumber" />
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
                          type="number"
                          fullWidth
                          parse={parseApartmentNumber}
                        />
                        <ErrorMessage
                          name={`addresses[${index}].apartmentNumber`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].streetName`}
                          label="Street Name"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name={`addresses[${index}].streetName`} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].postalCode`}
                          label="Postal Code"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name={`addresses[${index}].postalCode`} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].state`}
                          label="State"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name={`addresses[${index}].state`} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Field
                          as={TextField}
                          name={`addresses[${index}].country`}
                          label="Country"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name={`addresses[${index}].country`} />
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
                      {
                        streetName: "",
                        postalCode: "",
                        apartmentNumber: 0,
                        state: "",
                        country: "",
                      },
                    ]);
                  }}
                >
                  Add Address
                </Button>
              </Grid>
              <Grid item xs={12}>
                {selectedEmployee !== null ? (
                  <>
                    <Button
                      type="submit"
                      className={classes.button}
                      variant="outlined"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      onClick={handleUnselectEmployee}
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
                      onConfirm={() =>
                        handleDeleteEmployee(selectedEmployee!.id!)
                      }
                    />
                  </>
                ) : (
                  <>
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
                      onClick={handleUnselectEmployee}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeFormwithFormik;
