import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LaunchIcon from '@material-ui/icons/Launch';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { dateformat } from '../utils/date';

const openLink = (id) => window.open(`https://stubhub.com/event/${id}`, '_blank');

function StubHubEvent({
  getActiveStubHubEventId,
  hasActiveEvent,
  toggleMapDialogOpen,
  setActiveStubHubEvent,
  exchangeEventId, event, venue, eventDate,
}) {
  const handleClick = () => setActiveStubHubEvent({
    exchangeEventId, event, venue, eventDate,
  });

  const selected = getActiveStubHubEventId() === exchangeEventId;

  return (
    <ListItem selected={selected} button key={exchangeEventId} onClick={handleClick}>
      <ListItemText primary={event} secondary={`${venue} || ${dateformat(eventDate)}`} />
      <ListItemSecondaryAction>
        {hasActiveEvent()
        && (
          <Tooltip title="Map event">
            <IconButton aria-label="map" onClick={() => { handleClick(); toggleMapDialogOpen(); }}>
              <DoneOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View on StubHub">
          <IconButton aria-label="open stubhub" onClick={() => openLink(exchangeEventId)}>
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

StubHubEvent.propTypes = {
  getActiveStubHubEventId: PropTypes.func.isRequired,
  hasActiveEvent: PropTypes.func.isRequired,
  toggleMapDialogOpen: PropTypes.func.isRequired,
  setActiveStubHubEvent: PropTypes.func.isRequired,
  exchangeEventId: PropTypes.number.isRequired,
  event: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
};

export default StubHubEvent;
