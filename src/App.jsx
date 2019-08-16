import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  GraphQLClient, ClientContext,
} from 'graphql-hooks';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import Stubhub from './components/StubHub';
import Uptick from './components/Uptick';
import EventContext from './context/EventContext';


const client = new GraphQLClient({
  url: '/graphql',
});

function App() {
  const [stubHubSearch, setStubHubSearch] = useState({
    event: '',
    venue: '',
  });

  const [activeEventId, setActiveEventId] = useState(null);

  const [updateSearchEnabled, setToggleUpdateSearch] = useState(true);

  const updateSearch = (override, args) => (updateSearchEnabled || override) && setStubHubSearch(args);

  const toggleUpdateSearchEnabled = () => setToggleUpdateSearch(!updateSearchEnabled);

  const context = {
    activeEventId,
    setActiveEventId,
    stubhubSearchEvent: stubHubSearch.event,
    stubhubSearchVenue: stubHubSearch.venue,
    toggleUpdateSearchEnabled,
    updateSearchEnabled,
    updateSearch,
  };

  return (
    <EventContext.Provider value={context}>
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
    </EventContext.Provider>
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
