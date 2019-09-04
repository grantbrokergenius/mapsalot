/* eslint-disable camelcase */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';
import { useMutation } from 'graphql-hooks';
import { Dialog, DialogTitle, DialogContentText, Button, DialogContent, DialogActions } from '@material-ui/core';

const MARK_UNRESOLVED_MUTATION = 'mutation MarkUnresolved($bg_event_id: Int!) { markUnresolved(bg_event_id: $bg_event_id) }';


function MarkUnresolved({
  bg_event_id,
}) {
  const [markUnresolved] = useMutation(MARK_UNRESOLVED_MUTATION);
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleAccept() {
    setOpen(false);
    markUnresolved({ variables: { bg_event_id } });
  }

  return (
    <>
      <Tooltip title="Mark as unresolveable">
        <IconButton aria-label="unresolveable" onClick={handleClickOpen}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Mark as unresolveable?</DialogTitle>
        <DialogContent>
          <DialogContentText>
        This event will be marked unresolveable and will not show up in the mapping queue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
        Disagree
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
        Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MarkUnresolved.propTypes = {
  bg_event_id: PropTypes.number.isRequired,
};

export default MarkUnresolved;
