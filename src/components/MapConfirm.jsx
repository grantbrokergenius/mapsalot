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
import { dateformat } from '../utils/date';

const MAP_EVENT_MUTATION = 'mutation Map(id: String!, stubhub: Int!) { mapEvent(id: $id, stubhub: $stubhub) { ok } }';

function MapTable({ left, right, children }) {
  return (
    <Grid container spacing={1} justify="center">
      <Grid container item xs={12} spacing={0}>
        <Grid item xs>
          <Typography>{left}</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs>
          <Typography>{right}</Typography>
        </Grid>
        {children}
      </Grid>
    </Grid>
  );
}

MapTable.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Row({ left, right }) {
  return (
    <Grid container item xs={12} spacing={0}>
      <Grid item xs>
        <Typography>{left}</Typography>
      </Grid>
      <Grid item xs={1}>
        <SwapHorizIcon />
      </Grid>
      <Grid item xs>
        <Typography>{right}</Typography>
      </Grid>
    </Grid>
  );
}


Row.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
};

function MapConfirm({
  toggleMapDialogOpen, mapDialogOpen, activeEvent, activeStubHubEvent,
}) {
  const [mapEvent] = useMutation(MAP_EVENT_MUTATION);

  const confirm = async () => {
    await mapEvent({
      variables: { id: activeEvent.bgEventId, stubhub: activeStubHubEvent.exchangeEventId },
    });
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
      <MapTable left="Uptick" right="StubHub">
        <Row left={activeEvent.event} right={activeStubHubEvent.event} />
        <Row left={activeEvent.venue} right={activeStubHubEvent.venue} />
        <Row left={dateformat(activeEvent.eventDate)} right={dateformat(activeStubHubEvent.eventDate)} />

      </MapTable>
    )}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleMapDialogOpen} color="primary">
            Cancel (N)
        </Button>
        <Button onClick={confirm} color="primary" autoFocus>
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
