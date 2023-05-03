import { Theme, createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    marginTop: theme.spacing(4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 1, 2),
  },
  buttonNavbar: {
    margin: theme.spacing(3, 3, 3),
      color: 'inherit',
      border: "2px solid white"
  }
})
);
