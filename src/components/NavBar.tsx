import React from "react";
import {
  AppBar,
  Button,
  Theme,
  Toolbar,
  Typography,
  createStyles,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(3, 3, 3),
      color: 'inherit',
      border: "2px solid white"
    },
  })
);

interface IProps {
  onAddEmployee: () => void;
}

const Navbar: React.FC<IProps> = ({onAddEmployee}) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Employee Manager</Typography>
        <Button
        className={classes.button}
        onClick={onAddEmployee}
      >
        Add Employee
      </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
