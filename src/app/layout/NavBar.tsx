import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Employee Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
