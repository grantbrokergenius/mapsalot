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
import { useStubHubSearchFields } from '../context/StubHubSearchFieldsContext';


const SEARCH_QUERY = `query findStubHubEvents($offset: Int, $event_name: String, $venue_name: String) {
   findStubHubEvents(offset: $offset, event_name: $event_name, venue_name: $venue_name){
      stubhub_event_id, event_name, venue_name, event_date
    }
  }`;

function StubhubSearchFields() {
  const {
    searchEventInput,
    searchVenueInput,
    updateSearchEnabled,
    toggleUpdateSearchEnabled,
    updateSearchInput,
    set,
    timer,
  } = useStubHubSearchFields();

  const { updateSearch } = useStubHub();

  const setTimer = set('timer');

  const delayUpdate = (data, delay) => {
    if (timer) { clearInterval(timer); }

    setTimer(setTimeout(
      () => updateSearch(data), delay,
    ));
  };

  const handleChange = (name) => (value) => {

    const data = { searchEventInput, searchVenueInput, [name]: value };
    console.log(data);
    delayUpdate({ event: data.searchEventInput, venue: data.searchVenueInput }, 1000);
    updateSearchInput(data);
    // set(name)(value);
    // if (timer) { clearInterval(timer); }
    // delayUpdate({ event: searchEventInput, venue: searchVenueInput, [name]: value }, 1000);
  };

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
    </>
  );
}

function StubHubSearchResults() {
  const {
    hasActiveEvent,
    activeStubHubEvent,
    setActiveStubHubEvent,
    getActiveStubHubEventId,
    toggleMapDialogOpen,
  } = useContext(EventContext);

  const { searchEvent, searchVenue } = useStubHub();

  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { offset: 0, event_name: searchEvent, venue_name: searchVenue },
  });

  if (loading) return (<CircularProgress />);
  if (error) return (<Error />);
  if (data && data.findStubHubEvents) {
    return data.findStubHubEvents.map(
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
    );
  }
}

export default function Stubhub() {
  return (
    <>
      <StubhubSearchFields />
      <div
        style={{ flexFlow: '1 0 auto', overflow: 'auto' }}
      >
        <StubHubSearchResults />
      </div>
    </>
  );
}
