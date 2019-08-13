import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  useQuery, useManualQuery, GraphQLClient, ClientContext,
} from 'graphql-hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  ListItem, ListItemText, AppBar, Toolbar, CssBaseline,
} from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme, withTheme } from '@material-ui/core/styles';


const client = new GraphQLClient({
  url: '/graphql',
});


const LIST_QUERY = 'query List($offset: Int) { list(offset: $offset){ bg_event_id, event_name, venue_name, event_date } }';

const MAP_QUERY = 'mutation Map(id: String!, stubhub: Int!) { mapEvent(id: $id, stubhub: $stubhub) { ok } }';


function Event({
  bg_event_id, event_name, venue_name, event_date,
}) {
  return (
    <ListItem button key={bg_event_id}>
      <ListItemText primary={event_name} secondary={`${venue_name} || ${new Date(parseInt(event_date))}`} />
    </ListItem>
  );
}

function StubhubEvent({ }) {
  return (<li>Hi</li>);
}

function Stubhub() {
  const [values, setValues] = useState({
    event: '',
    venue: '',
  });
  const [checks, setChecks] = useState({
    updateSearch: true,
  });

  const handleCheck = name => (event) => {
    setChecks({ ...checks, [name]: event.target.checked });
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch checked={checks.updateSearch} onChange={handleCheck('updateSearch')} value="updateSearch" />
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

function Uptick() {
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
        {loading && 'Loading...'}
        {error && 'Something went wrong'}
        {data && data.list.map(event => (<Event {...event} />
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

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" color="primary">
        <Toolbar>
          <img alt="mapsalot" src="Spamalot.jpg" />
        </Toolbar>
      </AppBar>

      <Grid container style={{ height: 'calc(100% - 114px)' }}>
        <Grid item style={{ height: '100%', width: '50%' }}>
          <Paper className="uptick" style={{ height: '100%', flexFlow: 'column', display: 'flex' }}>
            <Uptick />
          </Paper>
        </Grid>

        <Grid item style={{ height: '100%', width: '50%' }}>
          <Paper className="stubhub">
            <Stubhub />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#026dfb',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#fe0103',
    },
    // error: will use the default color
  },
});


ReactDOM.render(<ClientContext.Provider value={client}>
  <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>
</ClientContext.Provider>, document.getElementById('app'));
