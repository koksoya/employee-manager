import { Button, Divider, Grid, TextField } from "@material-ui/core";
import React from "react";
import { IAddress, IEmployee } from "../types/interfaces";
import { useStyles } from "../styles/styles";
import { Field, FormikErrors, FormikTouched } from "formik";

interface IAddressProps {
  address: IAddress;
  index?: number;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAddress: (index: number) => void;
  errors?: FormikErrors<IEmployee> | undefined;
  helperText?: any;
  showRemoveButton?: boolean;
  values?: any;
  touched?: FormikTouched<IEmployee> | undefined;
}

const AddressFormik: React.FC<IAddressProps> = ({
  address,
  handleAddressChange,
  index,
  handleRemoveAddress,
  showRemoveButton = true,
  touched,
  errors
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={6}>
        <Field
          as={TextField}
          variant="outlined"
          required
          fullWidth
          id="apartmentNumber"
          label="Number"
          name="apartmentNumber"
          error={touched!.addresses && errors?.addresses && touched!.addresses[index!].apartmentNumber 
            && errors?.addresses[index!] ? true : false}
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
      {showRemoveButton && (
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={() => handleRemoveAddress(index!)}
        >
          Remove Address
        </Button>
      )}
    </>
  );
};

export default AddressFormik;
