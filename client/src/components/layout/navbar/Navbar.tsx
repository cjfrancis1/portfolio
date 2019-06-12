import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Hidden,
  Link,
  Typography,
  withStyles,
  Theme,
  Button
} from "@material-ui/core";
import NavDrawer from "./NavDrawer";
import { Link as RouterLink } from "react-router-dom";
import { Classes } from "jss";

const styles = (theme: Theme) => ({
  link: {
    color: "white",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    "&:last-child": {
      marginRight: 0
    }
  },
  button: {
    background: theme.palette.secondary.dark,
    borderRadius: "30px",
    "text-transform": "inherit",
    "font-weight": "inherit",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2.5}px`
  }
});

function Navbar(props: { classes: Classes }) {
  const { classes } = props;

  return (
    <div className="grow" data-test="app-bar">
      <AppBar position="static">
        <Toolbar>
          <Link
            component={({ innerRef, ...props }) => (
              <RouterLink {...props} to="/" />
            )}
            variant="h6"
            color="inherit"
            className="grow"
            underline="none"
          >
            DECREE Digital
          </Link>
          <Hidden mdUp>
            <NavDrawer />
          </Hidden>
          <Hidden smDown>
            <Typography>
              <Link
                component={({ innerRef, ...props }) => (
                  <RouterLink {...props} to="/work" />
                )}
                color="inherit"
                className={`grow ${classes.link}`}
                underline="none"
              >
                Work
              </Link>
              <Link
                component={({ innerRef, ...props }) => (
                  <RouterLink {...props} to="/services" />
                )}
                color="inherit"
                className={`grow ${classes.link}`}
                underline="none"
              >
                Services
              </Link>
              <Link
                component={({ innerRef, ...props }) => (
                  <RouterLink {...props} to="/about-us" />
                )}
                color="inherit"
                className={`grow ${classes.link}`}
                underline="none"
              >
                About us
              </Link>
              <Button
                variant="contained"
                color="secondary"
                className={`grow ${classes.link} ${classes.button}`}
              >
                Request a quote
              </Button>
            </Typography>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Navbar);
