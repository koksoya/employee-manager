import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { IAddress, IEmployee } from "../types/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import DeleteEmployeeConfirmation from "../components/DeleteEmployeeConfirmation";
import { useStyles } from "../styles/styles";
import Address from "../components/Address";
import employeeService from "../services/EmployeeService";
import { combineLatest, tap } from "rxjs";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EmployeeForm: React.FC = () => {
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const isUpdating = useMemo(() => {
    return employee && employee.firstName !== "" && employee.id !== "";
  }, [employee]);

  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const combinedSubscription = combineLatest([
      employeeService.selectedEmployee$,
      employeeService.emails$,
    ])
      .pipe(
        tap(([employee, emails]) => {
          if (!employee && id) employeeService.setSelectedEmployeeById(id);
          setEmployee(employee);
          setEmails(emails);
        })
      )
      .subscribe();

    return () => {
      combinedSubscription.unsubscribe();
    };
  }, [id]);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required")
          .test("email-exists", "Email already exists", function (value) {
            const isEmailExists = emails.some(
              (email) => email === value && email !== employee?.email
            );
            return !isEmailExists;
          }),
        phoneNumber: yup.string().required("Phone Number is required"),
        addresses: yup.array().of(
          yup.object().shape({
            streetName: yup.string().required("Street Name is required"),
            postalCode: yup.string().required("Postal Code is required"),
            apartmentNumber: yup
              .number()
              .typeError("Apartment Number must be a number")
              .required("Apartment Number is required"),
            state: yup.string().required("State is required"),
            country: yup.string().required("Country is required"),
          })
        ),
      }) as yup.ObjectSchema<IEmployee>,
    [emails, employee?.email]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<IEmployee>({
    resolver: yupResolver(validationSchema),
    defaultValues: isUpdating
      ? {
          id: employee?.id || "",
          firstName: employee?.firstName || "",
          lastName: employee?.lastName || "",
          email: employee?.email || "",
          phoneNumber: employee?.phoneNumber || "",
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  useEffect(() => {
    if (employee) {
      if (isUpdating) {
        setValue("id", employee.id || "");
      }
      // Set form fields based on employee
      setValue("firstName", employee.firstName || "");
      setValue("lastName", employee.lastName || "");
      setValue("email", employee.email || "");
      setValue("phoneNumber", employee.phoneNumber || "");

      // Clear existing address fields
      remove();

      // Add new address fields based on employee addresses
      if (employee.addresses) {
        employee.addresses.forEach((address) => {
          append(address);
        });
      }
    } else {
      // Clear the form when employee is null
      reset();
    }
  }, [employee, setValue, remove, append, reset, isUpdating]);

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

  const onSubmit = handleSubmit(async (data) => {
    if (isUpdating) {
      handleUpdateEmployee(data);
    } else {
      handleCreateEmployee(data);
    }
  });

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography component="h1" variant="h5">
        Add New Employee
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                />
              )}
            />
            {errors.firstName && (
              <Typography color="error">{errors.firstName.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            {errors.lastName && (
              <Typography color="error">{errors.lastName.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            {errors.email && (
              <Typography color="error">{errors.email.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            {errors.phoneNumber && (
              <Typography color="error">
                {errors.phoneNumber.message}
              </Typography>
            )}
          </Grid>
          <div>
            {fields.map((address: IAddress, index: number) => (
              <Address
                key={index}
                index={index}
                remove={() => remove(index)}
                control={control}
                errors={errors}
              />
            ))}
            <Button
              className={classes.button}
              type="button"
              variant="outlined"
              color="primary"
              onClick={() =>
                append({
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
                  className={classes.button}
                  disabled={!isValid}
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
      </form>
    </Container>
  );
};

export default EmployeeForm;
