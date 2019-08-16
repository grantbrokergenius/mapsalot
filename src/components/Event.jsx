/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EventContext from '../context/EventContext';
import date from '../utils/date';

function Event({
  setSelected, bg_event_id, event_name, venue_name, event_date,
}) {
  const { activeEventId } = useContext(EventContext);

  const handleClick = () => setSelected(bg_event_id, event_name, venue_name);
  const selected = activeEventId === bg_event_id;
  return (
    <ListItem selected={selected} button key={bg_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${date(event_date)}`} />
    </ListItem>
  );
}

Event.propTypes = {
  setSelected: PropTypes.func.isRequired,
  bg_event_id: PropTypes.number.isRequired,
  event_name: PropTypes.string.isRequired,
  venue_name: PropTypes.string.isRequired,
  event_date: PropTypes.number.isRequired,
};

export default Event;
