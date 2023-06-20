import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { IAddress, IEmployee } from "../types/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import DeleteEmployeeConfirmation from "../components/DeleteEmployeeConfirmation";
import { useStyles } from "../styles/styles";
import Address from "../components/Address";
import employeeService from "../services/EmployeeService";
import { tap } from "rxjs";

const EmployeeForm: React.FC = () => {
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const isUpdating = useMemo(() => {
    return employee && employee.firstName !== '' && employee.id !== '';
  }, [employee]);

  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const employeeSubscription = employeeService.selectedEmployee$
      .pipe(
        tap((employee) => {
          if (!employee && id) employeeService.setSelectedEmployeeById(id);
        })
      )
      .subscribe((employee) => {
        setEmployee(employee);
      });

    const emailSubscription = employeeService.emails$.subscribe((emails) => {
      setEmails(emails);
    });

    return () => {
      employeeSubscription.unsubscribe();
      emailSubscription.unsubscribe();
    };
  }, [id, employee]);

  const validationSchema = useMemo(() => Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .test("email-exists", "Email already exists", function (value) {
        const isEmailExists = emails.some(
          (email) => email === value && email !== employee?.email
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
  }),[emails, employee?.email]);

  const handleDeleteConfirmationClose = useCallback(() => {
    setIsDeleteConfirmationOpen(false);
  }, []);
  
  const handleDeleteConfirmationOpen = useCallback(() => {
    setIsDeleteConfirmationOpen(true);
  }, []);
  

  const handleCreateEmployee = async (newEmployee: IEmployee) => {
    await employeeService.createEmployee(newEmployee);
    navigate("/");
  };

  const handleUpdateEmployee = async (updatedEmployee: IEmployee) => {
    await employeeService.updateEmployee(updatedEmployee);
    navigate("/");
  };

  const handleDeleteEmployee = async (id: string) => {
    await employeeService.deleteEmployee(id!);
    navigate("/");
  };

  const handleUnselectEmployee = () => {
    setEmployee(null);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Add New Employee
      </Typography>
      <Formik
        enableReinitialize
        initialValues={
          employee || {
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
                {isUpdating ? (
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
                      onConfirm={() => handleDeleteEmployee(employee!.id!)}
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
