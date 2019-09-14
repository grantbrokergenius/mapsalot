/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useQuery } from 'graphql-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventContext from '../context/EventContext';
import Error from './Error';
import StubHubEvent from './StubHubEvent';
import SearchInput from './SearchInput';
import { useStubHub } from '../context/StubHubContext';
import { useStubHubSearchValues } from '../context/StubHubSearchValuesContext';


const SEARCH_QUERY = `query findStubHubEvents($offset: Int, $event_name: String, $venue_name: String) {
   findStubHubEvents(offset: $offset, event_name: $event_name, venue_name: $venue_name){
      stubhub_event_id, event_name, venue_name, event_date
    }
  }`;

function StubhubSearchFields() {
  const {
    values,
    updateInputValue,
  } = useStubHubSearchValues();

  const { values: shValues, updateSearchValue } = useStubHub();


  return (
    <>
      {/* <FormControlLabel
        control={
          <Switch checked={updateSearchEnabled}
            onChange={toggleUpdateSearchEnabled} value="updateSearchEnabled" />
        }
        label="Update search when clicking events"
      /> */ }
      <SearchInput
        label="Event Name"
        value={values.event}
        onChange={updateInputValue('event')}
        delayedChange={updateSearchValue('event')}
        delay={200}
      />
      <SearchInput
        label="Venue"
        value={values.venue}
        onChange={updateInputValue('venue')}
        delayedChange={updateSearchValue('venue')}
        delay={200}
      />
      <KeyboardDatePicker
        autoOk
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-from"
        label="Date from"
        value={shValues.dateFrom}
        onChange={updateSearchValue('dateFrom')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardDatePicker
        autoOk
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-to"
        label="Date to"
        value={shValues.dateTo}
        onChange={updateSearchValue('dateTo')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
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

  const { values } = useStubHub();

  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { offset: 0, event_name: values.event, venue_name: values.venue },
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
