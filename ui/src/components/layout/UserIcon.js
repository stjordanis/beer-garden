import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Menu,
  MenuItem,
  Hidden,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness3 from "@material-ui/icons/Brightness3";
import Brightness5 from "@material-ui/icons/Brightness5";
import LockOpen from "@material-ui/icons/LockOpen";

const styles = theme => ({
  accountIcon: {
    marginRight: theme.spacing.unit,
  },
});

export class UserIcon extends Component {
  state = {
    anchorEl: null,
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  toggleTheme = () => {
    const { themeName, setUserTheme } = this.props;
    if (themeName === "dark") {
      setUserTheme("light");
    } else {
      setUserTheme("dark");
    }
  };

  logout = () => {
    this.props.logout();
  };

  themeMenuItem = () => {
    const { themeName } = this.props;
    const isLightTheme = themeName === "light";
    let icon, primary;
    if (isLightTheme) {
      primary = "Dark theme";
      icon = <Brightness3 />;
    } else {
      primary = "Light theme";
      icon = <Brightness5 />;
    }
    return (
      <>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText inset primary={primary} />
      </>
    );
  };

  signoutMenuItem = () => {
    const { authEnabled, isAuthenticated } = this.props;
    if (authEnabled && isAuthenticated) {
      return (
        <MenuItem id="signoutMenuItem" onClick={this.logout}>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText inset primary="Sign Out" />
        </MenuItem>
      );
    }

    return null;
  };

  render() {
    const { anchorEl } = this.state;
    const { username, classes } = this.props;
    const open = Boolean(anchorEl);
    return (
      <>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.openMenu}
          color="inherit"
        >
          <AccountCircle className={classes.accountIcon} />
          <Hidden xsDown>
            <Typography variant="body1" color="inherit">
              {" "}
              {username}
            </Typography>
          </Hidden>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem id="themeMenuItem" onClick={this.toggleTheme}>
            {this.themeMenuItem()}
          </MenuItem>
          {this.signoutMenuItem()}
        </Menu>
      </>
    );
  }
}

UserIcon.propTypes = {
  authEnabled: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  themeName: PropTypes.string.isRequired,
  setUserTheme: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default withStyles(styles)(UserIcon);