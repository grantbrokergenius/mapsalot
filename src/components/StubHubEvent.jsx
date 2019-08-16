import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import dateformat from 'dateformat';
import EventContext from '../context/EventContext';

export default function StubHubEvent({
  stubhub_event_id, event_name, venue_name, event_date,
}) {
  const { activeStubHubEventId, setActiveStubHubEventId } = useContext(EventContext);
  
  const date = (d) => dateformat(new Date(parseInt(d)), 'ddd mmm d, yyyy h:MM TT');

  const handleClick = () => setActiveStubHubEventId(stubhub_event_id); // setSelected(bg_event_id, event_name, venue_name);

  return (
    <ListItem selected={activeStubHubEventId === stubhub_event_id} button key={stubhub_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${date(event_date)}`} />
    </ListItem>
  );
}
