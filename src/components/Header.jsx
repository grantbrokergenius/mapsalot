import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Switch } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.10);',
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
        <Button className={classes.button}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
