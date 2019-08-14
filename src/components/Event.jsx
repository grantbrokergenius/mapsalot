import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Event({
  updateSearch, bg_event_id, event_name, venue_name, event_date
}) {
  const handleClick = () => updateSearch({ event: event_name, venue: venue_name });

  return (
    <ListItem button key={bg_event_id} onClick={handleClick}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${new Date(parseInt(event_date))}`} />
    </ListItem>
  );
}