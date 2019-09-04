import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { KeyboardDatePicker } from '@material-ui/pickers';
import { useQuery, useManualQuery } from 'graphql-hooks';

import {
  Typography,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Event from './Event';
import EventContext from '../context/EventContext';
import Error from './Error';

const LIST_QUERY = 'query List($offset: Int) { list(offset: $offset){ bg_event_id, event_name, venue_name, event_date } }';

export default function Uptick() {
  const PER_PAGE = 100;

  const [offset, setOffset] = useState(0);
  const [values, setValues] = useState({
    event_name: '',
    venue_name: '',
    date_from: new Date(),
    date_to: new Date(),
  });

  const { setActiveEvent, activeEvent, updateSearch } = useContext(
    EventContext,
  );
  const activeEventId = activeEvent && activeEvent.bg_event_id;

  const { loading, error, data } = useQuery(LIST_QUERY, {
    variables: { offset },
  });

  const { useMapQuery } = useManualQuery(MAP_QUERY);

  const handleChange = (name) => (value) => {
    setValues({ ...values, [name]: value });
  };

  const handleChangeEvent = (name) => (event) => {
    handleChange(name)(event.target.value);
  };

  const setSelected = (event) => {
    setActiveEvent(event);
    updateSearch(false, { event: event.event_name, venue: event.venue_name });
  };

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SearchInput
            label="Event Name"
            value={values.event_name}
            onChange={handleChangeEvent('event_name')}
            delay={1000}
            />
          <SearchInput
            label="Venue Name"
            value={values.venue_name}
            onChange={handleChangeEvent('venue_name')}
            delay={1000}
            />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-from"
            label="Date from"
            value={values.date_from}
            onChange={handleChange('date_from')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-to"
            label="Date to"
            value={values.date_to}
            onChange={handleChange('date_to')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div style={{ flexFlow: '1 0 auto', overflow: 'auto' }}>
        {loading && <CircularProgress />}
        {error && <Error />}
        {data
          && data.list
          && data.list.map((event) => (
            <Event
              key={event.bg_event_id}
              activeEventId={activeEventId}
              setSelected={setSelected}
              {...event}
            />
          ))}
      </div>
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
