/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useQuery } from 'graphql-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { format } from 'date-fns';
import EventContext from '../context/EventContext';
import Error from './Error';
import StubHubEvent from './StubHubEvent';
import SearchInput from './SearchInput';
import { useStubHub } from '../context/StubHubContext';

const SEARCH_QUERY = `query findStubHubEvents($offset: Int, $event: String, $venue: String, $dateFrom: String, $dateTo: String, $order: String) {
   findStubHubEvents(offset: $offset, event: $event, venue: $venue, dateFrom: $dateFrom, dateTo: $dateTo, order: $order){
      exchangeEventId, event, venue, eventDate
    }
  }`;

function StubhubSearchFields() {

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
        value={shValues.event}
        delayedChange={updateSearchValue('event')}
        delay={200}
      />
      <SearchInput
        label="Venue"
        value={shValues.venue}
        delayedChange={updateSearchValue('venue')}
        delay={200}
      />
      <KeyboardDatePicker
        autoOk
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
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
        format="yyyy-MM-dd"
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
    variables: {
      offset: 0,
      event: values.event,
      venue: values.venue,
      dateFrom: values.dateFrom && format(values.dateFrom, 'yyyy-MM-dd'),
      dateTo: values.dateTo && format(values.dateTo, 'yyyy-MM-dd'),
      order: values.order,
    },
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
          key={event.exchangeEventId}
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
