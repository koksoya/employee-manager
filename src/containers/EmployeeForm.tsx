import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { IEmployee, IAddress } from '../models/employee';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  field: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface IProps {
  employee: IEmployee;
  onSubmit: (values: IEmployee) => void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phoneNumber: Yup.string().required('Required'),
});

const EmployeeForm: React.FC<IProps> = ({ employee, onSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          addresses: employee.addresses,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Field
              name="firstName"
              as={TextField}
              label="First Name"
              variant="outlined"
              className={classes.field}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              name="lastName"
              as={TextField}
              label="Last Name"
              variant="outlined"
              className={classes.field}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <Field
              name="email"
              as={TextField}
              label="Email"
              variant="outlined"
              className={classes.field}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              name="phoneNumber"
              as={TextField}
              label="Phone Number"
              variant="outlined"
              className={classes.field}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
