import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel, Switch,
} from '@material-ui/core';
import Exchanges from './Exchanges';
import Logout from './Logout';

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'space-between',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="primary">
      <Toolbar className={classes.root}>
        <img alt="mapsalot" src="Spamalot.jpg" />
        <FormControlLabel
          control={
            <Switch value="updateSearchEnabled" />
        }
          label="Update search when clicking events"
        />
        <Exchanges />
        <Logout />
      </Toolbar>
    </AppBar>
  );
}
