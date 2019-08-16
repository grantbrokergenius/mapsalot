import React, { useState, useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { useQuery } from 'graphql-hooks';
import EventContext from '../context/EventContext';

const SEARCH_QUERY = `query findStubHubEvents($offset: Int, $event_name: String, $venue_name: String) {
   findStubHubEvents(offset: $offset, event_name: $event_name, venue_name: $venue_name){
      stubhub_event_id, event_name, venue_name, event_date
    }
  }`;


function StubhubEvent({ }) {
  return (<li>Hi</li>);
}

export default function Stubhub({
  event, venue,
}) {
  const [values, setValues] = useState({
    event,
    venue,
  });

  const { updateSearchEnabled, toggleUpdateSearchEnabled, updateSearch } = useContext(EventContext);


  const handleChange = (name) => (event) => {
    const vals = { ...values, [name]: event.target.value };
    updateSearch(true)(vals);
    setValues(vals);
  };

  //  const { loading, error, data } = useQuery(SEARCH_QUERY, { variables: { offset: 0, event_name: event, venue_name: venue } });


  return (
    <>
      <FormControlLabel
        control={
          <Switch checked={updateSearchEnabled} onChange={toggleUpdateSearchEnabled} value="updateSearchEnabled" />
        }
        label="Update search when clicking events"
      />
      <TextField
        label="Event Name"
        value={values.event}
        onChange={handleChange('event')}
        margin="normal"
      />
      <TextField
        label="Venue"
        value={values.venue}
        onChange={handleChange('venue')}
        margin="normal"
      />
    </>
  );
}
