/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LaunchIcon from '@material-ui/icons/Launch';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EventContext from '../context/EventContext';
import date from '../utils/date';

const openLink = (id) => window.open(`https://stubhub.com/event/${id}`, '_blank');

function StubHubEvent({
  stubhub_event_id, event_name, venue_name, event_date,
}) {
  const {
    activeStubHubEventId,
    setActiveStubHubEventId,
    activeEventId,
    toggleMapDialogOpen,
  } = useContext(EventContext);

  const handleClick = () => setActiveStubHubEventId(stubhub_event_id);

  const selected = activeStubHubEventId === stubhub_event_id;

  return (
    <ListItem selected={selected} button key={stubhub_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${date(event_date)}`} />
      <ListItemSecondaryAction>
        {activeEventId
        && (
          <Tooltip title="Map event">
            <IconButton aria-label="map" onClick={toggleMapDialogOpen}>
              <DoneOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View on StubHub">
          <IconButton aria-label="open stubhub" onClick={() => openLink(stubhub_event_id)}>
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

StubHubEvent.propTypes = {
  stubhub_event_id: PropTypes.number.isRequired,
  event_name: PropTypes.string.isRequired,
  venue_name: PropTypes.string.isRequired,
  event_date: PropTypes.string.isRequired,
};

export default StubHubEvent;
