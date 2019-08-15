import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import dateformat from 'dateformat';
import EventContext from '../context/EventContext';

export default function Event({
  setSelected, bg_event_id, event_name, venue_name, event_date,
}) {
  const { activeEventId } = useContext(EventContext);

  const date = (d) => dateformat(new Date(parseInt(d)), 'ddd mmm d, yyyy h:MM TT');

  const handleClick = () => updateSearch({ event: event_name, venue: venue_name });
  return (
    <ListItem selected={activeEventId === bg_event_id} button key={bg_event_id} onClick={() => setSelected(bg_event_id)}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${date(event_date)}`} />
    </ListItem>
  );
}
