import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import employeeService from "../services/EmployeeService";

const NotFound = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorSubscription = employeeService.errorMessage$.subscribe(
      (error) => {
        setError(error);
      }
    );

    return () => {
      errorSubscription.unsubscribe();
    };
  });

  const handleGoToHomePage = () => {
    employeeService.setErrorMessage(null);
  };

  return (
    <Container>
      <div>{error}</div>
      <div>
        <Typography>
          Sorry for the inconvenience. Please go back to
          the&nbsp;
          <Link onClick={handleGoToHomePage} to="/">
            homepage
          </Link>
          .
        </Typography>
      </div>
    </Container>
  );
};

export default NotFound;
