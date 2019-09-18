import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { KeyboardDatePicker } from '@material-ui/pickers';
import { useQuery, useManualQuery } from 'graphql-hooks';

import {
  CircularProgress,
} from '@material-ui/core';
import Event from './Event';
import EventContext from '../context/EventContext';
import Error from './Error';
import SearchInput from './SearchInput';
import { useUptickSearchValues } from '../context/UptickSearchValuesContext';
import { useStubHubSearchValues } from '../context/StubHubSearchValuesContext';
import { UptickProvider, useUptick } from '../context/UptickContext';
import { useStubHub } from '../context/StubHubContext';

const LIST_QUERY = 'query List($offset: Int) { list(offset: $offset){ bgEventId, event, venue, eventDate } }';

function UptickSearchFields() {
  const {
    values,
    updateInputValue,
  } = useUptickSearchValues();

  const { values: uptickValues, updateSearchValue } = useUptick();

  return (
    <>
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
        format="yyyy-MM-dd"
        margin="normal"
        id="date-from"
        label="Date from"
        value={uptickValues.dateFrom}
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
        value={uptickValues.dateTo}
        onChange={updateSearchValue('dateTo')}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </>
  );
}

function UptickResults({
  offset, activeEventId, setActiveEvent, setSHSearchValues,
}) {
  const { update: updateSHSearch } = useStubHub();

  const { values } = useUptick();

  const setSelected = (event) => {
    setActiveEvent(event);
    // if (updateSearchEnabled) {
    updateSHSearch({
      event: event.event, venue: event.venue, dateFrom: new Date(Number(event.eventDate)), dateTo: null,
    });
    setSHSearchValues({ event: event.event, venue: event.venue });
    // }
  };

  const { loading, error, data } = useQuery(LIST_QUERY, {
    variables: {
      offset,
      event: values.event,
      venue: values.venue,
    },
  });

  return (
    <div style={{ flexFlow: '1 0 auto', overflow: 'auto' }}>
      {loading && <CircularProgress />}
      {error && <Error />}
      {data
    && data.list
    && data.list.map((event) => (
      <Event
        key={event.bgEventId}
        activeEventId={activeEventId}
        setSelected={setSelected}
        {...event}
      />
    ))}
    </div>
  );
}

function UptickChild({ setSHSearchValues }) {
  const PER_PAGE = 100;

  const [offset, setOffset] = useState(0);


  const { setActiveEvent, activeEvent } = useContext(
    EventContext,
  );

  const activeEventId = activeEvent && activeEvent.bgEventId;


  // const { useMapQuery } = useManualQuery(MAP_QUERY);


  const handleChangeEvent = (name) => (value) => {
    handleChange(name)(value);
  };


  return (
    <>
      <UptickSearchFields />
      <UptickResults
        offset={offset}
        activeEventId={activeEventId}
        setActiveEvent={setActiveEvent}
        setSHSearchValues={setSHSearchValues}
      />
      <div style={{ flexFlow: '0 1 140px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOffset(offset - PER_PAGE)}
          disabled={offset === 0}
        >
          Previous page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOffset(offset + PER_PAGE)}
        >
          Next page
        </Button>
      </div>
    </>
  );
}

export default function Uptick() {
  const { setValues: setSHSearchValues } = useStubHubSearchValues();
  return React.useMemo(() => (
    <UptickChild setSHSearchValues={setSHSearchValues} />
  ), [setSHSearchValues]);
}
