import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { Grid, Typography } from '@material-ui/core';
import EventContext from '../context/EventContext';
import date from '../utils/date';

export default function MapConfirm() {
  const {
    toggleMapDialogOpen, mapDialogOpen, activeEvent, activeStubHubEvent,
  } = useContext(EventContext);
  return (
    <Dialog
      open={mapDialogOpen}
      onClose={toggleMapDialogOpen}
    >
      <DialogTitle id="alert-dialog-title">Confirm mapping</DialogTitle>
      <DialogContent>
        {activeEvent && activeStubHubEvent
    && (
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={5}>
            <Typography>Uptick</Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={5}>
            <Typography>StubHub</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={5}>
            <Typography>{activeEvent.event_name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <SwapHorizIcon />
          </Grid>
          <Grid item xs={5}>
            <Typography>{activeStubHubEvent.event_name}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={5}>
            <Typography>{activeEvent.venue_name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <SwapHorizIcon />
          </Grid>
          <Grid item xs={5}>
            <Typography>{activeStubHubEvent.venue_name}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={5}>
            <Typography>{date(activeEvent.event_date)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <SwapHorizIcon />
          </Grid>
          <Grid item xs={5}>
            <Typography>{date(activeStubHubEvent.event_date)}</Typography>
          </Grid>
        </Grid>
      </Grid>
    )}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleMapDialogOpen} color="primary">
            Cancel (N)
        </Button>
        <Button onClick={toggleMapDialogOpen} color="primary" autoFocus>
            Confirm (Y)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
