import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "../styles/styles";
import { Controller } from "react-hook-form";

interface IAddressProps {
  index: number;
  remove: (index: number) => void;
  control: any;
  errors: any;
}

const Address: React.FC<IAddressProps> = ({
  index,
  remove,
  control,
  errors,
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
        <Controller
          control={control}
          name={`addresses[${index}].apartmentNumber`}
          render={({ field }) => (
            <TextField
              {...field}
              label="Apartment Number"
              variant="outlined"
              type="number"
              fullWidth
            />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].apartmentNumber && (
            <Typography color="error">
              {errors.addresses[index].apartmentNumber.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name={`addresses[${index}].streetName`}
          render={({ field }) => (
            <TextField
              {...field}
              label="Street Name"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].streetName && (
            <Typography color="error">
              {errors.addresses[index].streetName.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          control={control}
          name={`addresses[${index}].postalCode`}
          render={({ field }) => (
            <TextField
              {...field}
              label="Postal Code"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].postalCode && (
            <Typography color="error">
              {errors.addresses[index].postalCode.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          control={control}
          name={`addresses[${index}].state`}
          render={({ field }) => (
            <TextField {...field} label="State" variant="outlined" fullWidth />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].state && (
            <Typography color="error">
              {errors.addresses[index].state.message}
            </Typography>
          )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          control={control}
          name={`addresses[${index}].country`}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {errors.addresses &&
          errors.addresses[index] &&
          errors.addresses[index].country && (
            <Typography color="error">
              {errors.addresses[index].country.message}
            </Typography>
          )}
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
