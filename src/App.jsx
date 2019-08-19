import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import Auth from './components/Auth';
import Authorized from './components/Authorized';
import Header from './components/Header';
import Login from './components/Login';
import MapConfirm from './components/MapConfirm';
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

  const [activeEvent, setActiveEvent] = useState(null);
  const [activeStubHubEvent, setActiveStubHubEvent] = useState(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);


  const [updateSearchEnabled, setToggleUpdateSearch] = useState(true);

  const updateSearch = (override, args) => (updateSearchEnabled || override)
    && setStubHubSearch(args);

  const toggleUpdateSearchEnabled = () => setToggleUpdateSearch(!updateSearchEnabled);
  const toggleMapDialogOpen = () => setMapDialogOpen(!mapDialogOpen);


  const context = {
    activeEvent,
    activeStubHubEvent,
    setActiveEvent,
    setActiveStubHubEvent,
    stubhubSearchEvent: stubHubSearch.event,
    stubhubSearchVenue: stubHubSearch.venue,
    toggleUpdateSearchEnabled,
    updateSearchEnabled,
    updateSearch,
    mapDialogOpen,
    toggleMapDialogOpen,
  };

  return (
    <Auth>
      <Authorized anonymous>
        <Login />
      </Authorized>
      <Authorized>
        <EventContext.Provider value={context}>
          <CssBaseline />

          <Header />

          <MapConfirm toggleMapDialogOpen={toggleMapDialogOpen} mapDialogOpen={mapDialogOpen} activeEvent={activeEvent} activeStubHubEvent={activeStubHubEvent} />


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
      </Authorized>
    </Auth>
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


ReactDOM.render(
  <ClientContext.Provider value={client}>
    <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>
  </ClientContext.Provider>, document.getElementById('app'),
);
