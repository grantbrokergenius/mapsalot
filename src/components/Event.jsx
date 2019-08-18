/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';
import EventContext from '../context/EventContext';
import date from '../utils/date';


const useStyles = makeStyles((theme) => ({

  root: {
    '&:hover': {
      backgroundColor: 'rgb(255, 142, 203)',
    },
    '&$selected': {
      backgroundColor: 'rgb(235, 42, 174)',
      '&:hover': {
        backgroundColor: 'rgb(255, 142, 203)',
      },
      '&:focus': {
        backgroundColor: 'rgb(171, 27, 125)',
      },
    },
    '&:focus': {
      backgroundColor: 'rgb(171, 27, 125)',
    },
  },
  selected: {

  },
}));

function Event({
  setSelected, bg_event_id, event_name, venue_name, event_date,
}) {
  const classes = useStyles();
  const { activeEventId } = useContext(EventContext);

  const handleClick = () => setSelected(bg_event_id, event_name, venue_name);
  const selected = activeEventId === bg_event_id;
  return (
    <ListItem selected={selected} classes={classes} button key={bg_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${date(event_date)}`} />
      {selected
      && (
      <ListItemSecondaryAction>
        <Tooltip title="Mark as unresolveable">
          <IconButton aria-label="unresolveable">
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

Event.propTypes = {
  setSelected: PropTypes.func.isRequired,
  bg_event_id: PropTypes.number.isRequired,
  event_name: PropTypes.string.isRequired,
  venue_name: PropTypes.string.isRequired,
  event_date: PropTypes.string.isRequired,
};

export default Event;
