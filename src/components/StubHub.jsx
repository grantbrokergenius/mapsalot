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

export default function Stubhub() {
  const {
    updateSearchEnabled, toggleUpdateSearchEnabled, updateSearch, stubhubSearchEvent, stubhubSearchVenue,
  } = useContext(EventContext);

  const handleChange = (name) => (event) => {
    const vals = { event: stubhubSearchEvent, venue: stubhubSearchVenue, [name]: event.target.value };
    updateSearch(true, vals);
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
        value={stubhubSearchEvent}
        onChange={handleChange('event')}
        margin="normal"
      />
      <TextField
        label="Venue"
        value={stubhubSearchVenue}
        onChange={handleChange('venue')}
        margin="normal"
      />
    </>
  );
}
