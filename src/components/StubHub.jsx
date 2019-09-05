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
import SearchInput from './SearchInput';
import { useStubHub } from '../context/StubHubContext';


const SEARCH_QUERY = `query findStubHubEvents($offset: Int, $event_name: String, $venue_name: String) {
   findStubHubEvents(offset: $offset, event_name: $event_name, venue_name: $venue_name){
      stubhub_event_id, event_name, venue_name, event_date
    }
  }`;

export default function Stubhub() {
  const {
    hasActiveEvent,
    activeStubHubEvent,
    setActiveStubHubEvent,
    getActiveStubHubEventId,
    toggleMapDialogOpen,
  } = useContext(EventContext);

  const {
    searchEvent, searchVenue, searchEventInput,
    searchVenueInput, updateSearchInput, delayUpdate,
    updateSearchEnabled, toggleUpdateSearchEnabled, set,
  } = useStubHub();

  console.log(updateSearchEnabled);

  const handleChange = (name) => (value) => {
    set(name)(value);
    delayUpdate({ event: searchEventInput, venue: searchVenueInput, [name]: value }, 1000);
  };

  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { offset: 0, event_name: searchEvent, venue_name: searchVenue },
  });


  return (
    <>
      <FormControlLabel
        control={
          <Switch checked={updateSearchEnabled} onChange={toggleUpdateSearchEnabled} value="updateSearchEnabled" />
        }
        label="Update search when clicking events"
      />
      <SearchInput
        label="Event Name"
        value={searchEventInput}
        onChange={handleChange('searchEventInput')}
        delay={1000}
      />
      <SearchInput
        label="Venue"
        value={searchVenueInput}
        onChange={handleChange('searchVenueInput')}
        delay={1000}
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
