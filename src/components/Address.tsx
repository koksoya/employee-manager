import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { IAddress } from "../types/interfaces";

interface IAddressProps {
  address: IAddress;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Address: React.FC<IAddressProps> = ({ address, handleAddressChange }) => {
  return (
    <>
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
    </>
  );
};

export default Address;
