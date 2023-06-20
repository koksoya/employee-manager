import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../styles/styles";
import { ErrorMessage, Field } from "formik";

interface IAddressProps {
  index: number;
  remove: (index: number) => void;
}

const Address: React.FC<IAddressProps> = ({
  index,
  remove,
}) => {
  const classes = useStyles();



  return (
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
      />
      <ErrorMessage
        name={`addresses[${index}].apartmentNumber`}
        component="div"
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
      <ErrorMessage
        name={`addresses[${index}].streetName`}
        component="div"
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        as={TextField}
        name={`addresses[${index}].postalCode`}
        label="Postal Code"
        variant="outlined"
        fullWidth
      />
      <ErrorMessage
        name={`addresses[${index}].postalCode`}
        component="div"
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        as={TextField}
        name={`addresses[${index}].state`}
        label="State"
        variant="outlined"
        fullWidth
      />
      <ErrorMessage
        name={`addresses[${index}].state`}
        component="div"
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Field
        as={TextField}
        name={`addresses[${index}].country`}
        label="Country"
        variant="outlined"
        fullWidth
      />
      <ErrorMessage
        name={`addresses[${index}].country`}
        component="div"
      />
    </Grid>
    <Button
      className={classes.button}
      type="button"
      variant="outlined"
      color="secondary"
      onClick={() => remove(index)}
    >
      Remove Address
    </Button>
  </Grid>
  );
};

export default Address;
