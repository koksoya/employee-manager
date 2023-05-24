import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";


const NotFound = () => {

  return (
    <Container>
      <Typography>
        The page you are looking for doesn't exist
      </Typography>
      <Typography>
        Sorry for the inconvenience. Please check the URL or go back to the&nbsp;
        <Link to="/">
        homepage
        </Link>.
      </Typography>
    </Container>
  );
};

export default NotFound;