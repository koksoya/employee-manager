import { Button, Divider, Grid, TextField } from "@material-ui/core";
import React from "react";
import { IAddress } from "../types/interfaces";
import { useStyles } from "../styles/styles";

interface IAddressProps {
  address: IAddress;
  key?: number;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAddress: (index: number) => void;
}

const Address: React.FC<IAddressProps> = ({
  address,
  handleAddressChange,
  key,
  handleRemoveAddress,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="apartmentNumber"
          label="Number"
          name="apartmentNumber"
          value={address.apartmentNumber}
          onChange={handleAddressChange}
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
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        onClick={() => handleRemoveAddress(key!)}
      >
        Remove Address
      </Button>
    </>
  );
};

export default Address;
