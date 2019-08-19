/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { useQuery } from 'graphql-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventContext from '../context/EventContext';
import Error from './Error';
import StubHubEvent from './StubHubEvent';

const SEARCH_QUERY = `query findStubHubEvents($offset: Int, $event_name: String, $venue_name: String) {
   findStubHubEvents(offset: $offset, event_name: $event_name, venue_name: $venue_name){
      stubhub_event_id, event_name, venue_name, event_date
    }
  }`;

export default function Stubhub() {
  const {
    hasActiveEvent,
    activeStubHubEvent,
    toggleMapDialogOpen,
    setActiveStubHubEvent,
    getActiveStubHubEventId,
    updateSearchEnabled,
    toggleUpdateSearchEnabled,
    updateSearch,
    stubhubSearchEvent,
    stubhubSearchVenue,
  } = useContext(EventContext);

  const handleChange = (name) => (event) => {
    const vals = {
      event: stubhubSearchEvent,
      venue: stubhubSearchVenue,
      [name]: event.target.value,
    };
    updateSearch(true, vals);
  };

  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { offset: 0, event_name: stubhubSearchEvent, venue_name: stubhubSearchVenue },
  });


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
      <div
        style={{ flexFlow: '1 0 auto', overflow: 'auto' }}
      >
        {loading && <CircularProgress />}
        {error && <Error />}
        {data && data.findStubHubEvents && data.findStubHubEvents.map(
          (event) => (
            <StubHubEvent
              getActiveStubHubEventId={getActiveStubHubEventId}
              hasActiveEvent={hasActiveEvent}
              activeStubHubEvent={activeStubHubEvent}
              toggleMapDialogOpen={toggleMapDialogOpen}
              setActiveStubHubEvent={setActiveStubHubEvent}
              key={event.stubhub_event_id}
              {...event}
            />
          ),
        )}
      </div>
    </>
  );
}
