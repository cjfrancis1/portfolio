import React from "react";
import {
  IconButton,
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Theme,
  AppBar,
  Toolbar,
  Link
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Classes } from "jss";
import { Link as RouterLink } from "react-router-dom";

const styles = (theme: Theme) => ({
  root: {
    display: "flex"
  },
  secondaryDark: {
    backgroundColor: theme.palette.secondary.dark,
    color: "white"
  },
  noHoverColorSecondaryDark: {
    "&:hover": {
      background: theme.palette.secondary.dark
    }
  },
  appBar: {
    boxShadow: "none"
  },
  drawerPaper: {
    width: "100%"
  },
  toggleButton: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5
  },
  listItemText: {
    "text-align": "center",
    "font-weight": 700,
    "font-size": "1.2rem"
  }
});

interface INavDrawerProps {
  classes: Classes;
  theme: Theme;
}

interface INavDrawerState {
  open: boolean;
}

class NavDrawer extends React.Component<INavDrawerProps, INavDrawerState> {
  constructor(props: INavDrawerProps) {
    super(props);

    this.state = {
      open: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onDrawerEvent = this.onDrawerEvent.bind(this);
  }

  toggleDrawer(open: boolean) {
    this.setState({ open });
  }

  onMenuButtonClick(event: React.MouseEvent) {
    this.toggleDrawer(true);
  }

  onDrawerEvent(
    event: React.MouseEvent | React.SyntheticEvent | React.KeyboardEvent
  ) {
    this.toggleDrawer(false);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-test="nav-drawer">
        {/* Menu Button Start */}
        <IconButton
          className={`${classes.toggleButton} ${
            classes.noHoverColorSecondaryDark
          } ${classes.secondaryDark}`}
          color="inherit"
          aria-label="Menu"
          data-test="menu-button"
          onClick={this.onMenuButtonClick}
        >
          <MenuIcon />
        </IconButton>
        {/* Menu Button End */}
        {/* Drawer Start */}
        <Drawer
          open={this.state.open}
          onClose={this.onDrawerEvent}
          classes={{
            paper: `${classes.drawerPaper} ${classes.secondaryDark}`
          }}
          anchor="right"
        >
          {/* Drawer Header Start */}
          <AppBar
            position="static"
            className={`${classes.secondaryDark} ${classes.appBar}`}
          >
            <Toolbar>
              {/* Drawer Logo Start */}
              <Link
                component={({ innerRef, ...props }) => (
                  <RouterLink {...props} to="/" />
                )}
                variant="h6"
                color="inherit"
                className="grow"
                underline="none"
                onClick={this.onDrawerEvent}
              >
                DECREE Digital
              </Link>
              {/* Drawer Logo End */}
              {/* Drawer Close Button Start */}
              <IconButton
                className={`${classes.toggleButton} ${
                  classes.noHoverColorSecondaryDark
                }`}
                color="inherit"
                aria-label="Close"
                data-test="close-button"
                onClick={this.onDrawerEvent}
              >
                <CloseIcon />
              </IconButton>
              {/* Drawer Close Button End */}
            </Toolbar>
          </AppBar>
          {/* Drawer Header End */}
          {/* Drawer Navigation Start */}
          <List>
            <ListItem
              button
              className={`destination ${classes.noHoverColorSecondaryDark}`}
              component={({ innerRef, ...props }) => (
                <RouterLink {...props} to="/work" />
              )}
              onClick={this.onDrawerEvent}
            >
              <ListItemText
                classes={{
                  primary: `${classes.secondaryDark} ${classes.listItemText}`
                }}
                primary="Work"
              />
            </ListItem>
            <ListItem
              button
              className={`destination ${classes.noHoverColorSecondaryDark}`}
              component={({ innerRef, ...props }) => (
                <RouterLink {...props} to="/services" />
              )}
              onClick={this.onDrawerEvent}
            >
              <ListItemText
                classes={{
                  primary: `${classes.secondaryDark} ${classes.listItemText}`
                }}
                primary="Services"
              />
            </ListItem>
            <ListItem
              button
              className={`destination ${classes.noHoverColorSecondaryDark}`}
              component={({ innerRef, ...props }) => (
                <RouterLink {...props} to="/about-us" />
              )}
              onClick={this.onDrawerEvent}
            >
              <ListItemText
                classes={{
                  primary: `${classes.secondaryDark} ${classes.listItemText}`
                }}
                primary="About us"
              />
            </ListItem>
            <ListItem
              button
              className={`destination ${classes.noHoverColorSecondaryDark}`}
              onClick={this.onDrawerEvent}
            >
              <ListItemText
                classes={{
                  primary: `${classes.secondaryDark} ${classes.listItemText}`
                }}
                primary="Request a quote"
              />
            </ListItem>
            <ListItem
              button
              className={`destination ${classes.noHoverColorSecondaryDark}`}
              onClick={this.onDrawerEvent}
            >
              <ListItemText
                classes={{
                  primary: `${classes.secondaryDark} ${classes.listItemText}`
                }}
                primary="Let's chat"
              />
            </ListItem>
          </List>
          {/* Drawer Navigation End */}
        </Drawer>
        {/* Drawer End */}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavDrawer);
