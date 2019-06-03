import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Hidden, Link } from "@material-ui/core";
import NavDrawer from "./NavDrawer";
import { Link as RouterLink } from "react-router-dom";

function Navbar(props: {}) {
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
