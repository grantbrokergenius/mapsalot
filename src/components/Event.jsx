/* eslint-disable camelcase */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { dateformat } from '../utils/date';
import MarkUnresolved from './MarkUnresolved';


const useStyles = makeStyles(() => ({

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
  setSelected, activeEventId, bg_event_id, event_name, venue_name, event_date,
}) {
  const classes = useStyles();

  const handleClick = () => setSelected({
    bg_event_id, event_name, venue_name, event_date,
  });
  const selected = activeEventId === bg_event_id;
  return (
    <ListItem selected={selected} classes={classes} button key={bg_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${dateformat(event_date)}`} />
      {selected
      && (
      <ListItemSecondaryAction>
        <MarkUnresolved bg_event_id={bg_event_id} />
      </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

Event.propTypes = {
  setSelected: PropTypes.func.isRequired,
  activeEventId: PropTypes.number.isRequired,
  bg_event_id: PropTypes.number.isRequired,
  event_name: PropTypes.string.isRequired,
  venue_name: PropTypes.string.isRequired,
  event_date: PropTypes.string.isRequired,
};

export default Event;
