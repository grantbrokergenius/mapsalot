import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventContext from '../context/EventContext';

export default function MapConfirm() {
  const { toggleMapDialogOpen, mapDialogOpen } = useContext(EventContext);

  return (
    <Dialog
      open={mapDialogOpen}
      onClose={toggleMapDialogOpen}
    >
      <DialogTitle id="alert-dialog-title">Confirm mapping</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
        </DialogContentText>
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
