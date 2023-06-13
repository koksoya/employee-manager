import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { IAddress } from "../types/interfaces";
import { useParams } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import DeleteEmployeeConfirmation from "../components/DeleteEmployeeConfirmation";
import { EmployeeAPI } from "../API/EmployeeAPI";
import { useStyles } from "../styles/styles";
import Address from "../components/Address";

const EmployeeForm: React.FC = () => {
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
                <ErrorMessage name="firstName" component="div" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="lastName" component="div" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="phoneNumber" component="div" />
              </Grid>
              <FieldArray name="addresses">
                {({ push, remove }) => (
                  <div>
                    {formik.values.addresses.map(
                      (address: IAddress, index: number) => (
                        <Address key={index} index={index} remove={remove} />
                      )
                    )}
                    <Button
                      className={classes.button}
                      type="button"
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        push({
                          streetName: "",
                          postalCode: "",
                          apartmentNumber: 0,
                          state: "",
                          country: "",
                        })
                      }
                    >
                      Add Address
                    </Button>
                  </div>
                )}
              </FieldArray>
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

export default EmployeeForm;
