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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IAddress, IEmployee } from "../types/interfaces";
import Address from "../components/Address";
import { Link } from "react-router-dom";

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
  emails: string[];
}



const initialValues: IEmployee = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addresses: [
    {
      streetName: "",
      postalCode: "",
      apartmentNumber: null,
      state: "",
      country: "",
    },
  ],
};

const EmployeeFormwithFormik: React.FC<IProps> = ({ onCreateEmployee,emails }) => {
  const classes = useStyles();
  const [employee, setEmployee] = React.useState<IEmployee>(initialValues);
  const [addresses, setAddresses] = useState<IAddress[]>(employee.addresses);

  const addressValidationSchema = Yup.object().shape({
    streetName: Yup.string().required("Street name is required"),
    postalCode: Yup.string().required("Postal code is required"),
    apartmentNumber: Yup.number().required("Apartment number is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });
  

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .test("email-exists", "Email already exists", function (value) {
        const isEmailExists = emails.some((email) => email === value);
        return !isEmailExists;
      }),
    phoneNumber: Yup.string().required("Phone number is required"),
    addresses: Yup.array().of(addressValidationSchema).min(1, "At least one address is required"),
  });

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

  function handleAddAddress() {
    setAddresses([...addresses, { ...initialValues.addresses[0] }]);
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
          <Form className={classes.form}>
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
                  label="Email"
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
              {addresses.map((address, index) => (
                <Address
                  showRemoveButton={addresses.length > 1}
                  key={index}
                  address={address}
                  handleAddressChange={(e) => handleAddressChange(e, index)}
                  handleRemoveAddress={() => handleRemoveAddress(index)}
                  errors={errors}
                  touched={touched}
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
              type="submit"
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
            <Button className={classes.button} variant="outlined">
              <Link to="/">Cancel</Link>
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EmployeeFormwithFormik;
