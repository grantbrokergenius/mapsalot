import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  useQuery, useManualQuery
} from 'graphql-hooks';

import Event from './Event';
import { Typography, CircularProgress } from '@material-ui/core';

const LIST_QUERY = 'query List($offset: Int) { list(offset: $offset){ bg_event_id, event_name, venue_name, event_date } }';

const MAP_QUERY = 'mutation Map(id: String!, stubhub: Int!) { mapEvent(id: $id, stubhub: $stubhub) { ok } }';


function Error() {
  return (
    <>
    <Typography>Something went wrong</Typography>
    <Button
          variant="contained"
          color="primary"
        >Retry</Button>    </>
  )
}

export default function Uptick({ updateSearch }) {
  const PER_PAGE = 100;

  const [offset, setOffset] = useState(0);
  const [values, setValues] = useState({
    event_name: '',
    venue_name: '',
  });

  const { loading, error, data } = useQuery(LIST_QUERY, { variables: { offset } });

  const { useMapQuery } = useManualQuery(MAP_QUERY);


  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <TextField
        style={{ flexFlow: '0 1 auto' }}
        label="Event Name"
        value={values.event_name}
        onChange={handleChange('event_name')}
        margin="normal"
      />
      <TextField
        style={{ flexFlow: '0 1 auto' }}
        label="Venue"
        value={values.venue_name}
        onChange={handleChange('venue_name')}
        margin="normal"
      />
      <div
        style={{ flexFlow: '1 0 auto', overflow: 'auto' }}
      >
        {loading && <CircularProgress/>}
        {error && <Error/>}
        {data && data.list && data.list.map(event => (<Event key={event.bg_event_id} updateSearch={updateSearch} {...event} />
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