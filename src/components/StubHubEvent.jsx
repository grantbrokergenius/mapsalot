/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EventContext from '../context/EventContext';
import date from '../utils/date';

function StubHubEvent({
  stubhub_event_id, event_name, venue_name, event_date,
}) {
  const { activeStubHubEventId, setActiveStubHubEventId } = useContext(EventContext);

  const handleClick = () => setActiveStubHubEventId(stubhub_event_id);

  const selected = activeStubHubEventId === stubhub_event_id;

  return (
    <ListItem selected={selected} button key={stubhub_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${date(event_date)}`} />
    </ListItem>
  );
}

StubHubEvent.propTypes = {
  stubhub_event_id: PropTypes.number.isRequired,
  event_name: PropTypes.string.isRequired,
  venue_name: PropTypes.string.isRequired,
  event_date: PropTypes.number.isRequired,
};

export default StubHubEvent;
