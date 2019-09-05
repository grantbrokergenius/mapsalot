/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { Grid, Typography } from '@material-ui/core';
import { useMutation } from 'graphql-hooks';
import date from '../utils/date';

const MAP_EVENT_MUTATION = 'mutation Map(id: String!, stubhub: Int!) { mapEvent(id: $id, stubhub: $stubhub) { ok } }';

function MapConfirm({
  toggleMapDialogOpen, mapDialogOpen, activeEvent, activeStubHubEvent,
}) {
  const [mapEvent] = useMutation(MAP_EVENT_MUTATION);

  const confirm = async () => {
    await mapEvent({ variables: { id: activeEvent.bg_event_id, stubhub: activeStubHubEvent.stubhub_event_id } });
    toggleMapDialogOpen();
  };

  return (
    <Dialog
      open={mapDialogOpen}
      onClose={toggleMapDialogOpen}
    >
      <DialogTitle id="alert-dialog-title">Confirm mapping</DialogTitle>
      <DialogContent>
        {activeEvent && activeStubHubEvent
    && (
      <Grid container spacing={1} justify="center">
        <Grid container item xs={12} spacing={0}>
          <Grid item xs>
            <Typography>Uptick</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs>
            <Typography>StubHub</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <Grid item xs>
            <Typography>{activeEvent.event_name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <SwapHorizIcon />
          </Grid>
          <Grid item xs>
            <Typography>{activeStubHubEvent.event_name}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <Grid item xs>
            <Typography>{activeEvent.venue_name}</Typography>
          </Grid>
          <Grid item xs={1}>
            <SwapHorizIcon />
          </Grid>
          <Grid item xs>
            <Typography>{activeStubHubEvent.venue_name}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <Grid item xs>
            <Typography>{date(activeEvent.event_date)}</Typography>
          </Grid>
          <Grid item xs={1}>
            <SwapHorizIcon />
          </Grid>
          <Grid item xs>
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

MapConfirm.propTypes = {
  toggleMapDialogOpen: PropTypes.func.isRequired,
  mapDialogOpen: PropTypes.bool.isRequired,
  activeEvent: PropTypes.object.isRequired,
  activeStubHubEvent: PropTypes.object.isRequired,
};

export default MapConfirm;
