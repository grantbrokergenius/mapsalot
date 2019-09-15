import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ClientContext, GraphQLClient, useQuery } from 'graphql-hooks';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Auth from './components/Auth';
import Authorized from './components/Authorized';
import Header from './components/Header';
import Login from './components/Login';
import MapConfirm from './components/MapConfirm';
import Stubhub from './components/StubHub';
import Uptick from './components/Uptick';
import EventContext from './context/EventContext';
import { StubHubProvider } from './context/StubHubContext';
import { StubHubSearchValuesProvider } from './context/StubHubSearchValuesContext';


const client = new GraphQLClient({
  url: '/graphql',
});


const VERIFY_QUERY = 'query Verify { verify }';

function App() {
  const { loading: vLoading, error: vError, data: vData } = useQuery(VERIFY_QUERY);

  const [activeEvent, setActiveEvent] = useState(null);
  const [activeStubHubEvent, setActiveStubHubEvent] = useState(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);

  const toggleMapDialogOpen = () => setMapDialogOpen(!mapDialogOpen);

  const hasActiveEvent = () => !!activeEvent;
  const getActiveEventId = () => activeEvent && activeEvent.bg_event_id;
  const getActiveStubHubEventId = () => activeStubHubEvent && activeStubHubEvent.stubhub_event_id;


  const context = {
    activeEvent,
    activeStubHubEvent,
    setActiveEvent,
    hasActiveEvent,
    getActiveEventId,
    setActiveStubHubEvent,
    getActiveStubHubEventId,
    mapDialogOpen,
    toggleMapDialogOpen,
  };

  if (vLoading || vError) return (<></>);
  if (vData) {
    return (
      <Auth activeSession={vData.verify}>
        <Authorized anonymous>
          <Login />
        </Authorized>
        <Authorized>
          <StubHubProvider>
            <StubHubSearchValuesProvider>
              <EventContext.Provider value={context}>
                <CssBaseline />

                <Header />

                {activeEvent && activeStubHubEvent
          && (
          <MapConfirm
            toggleMapDialogOpen={toggleMapDialogOpen}
            mapDialogOpen={mapDialogOpen}
            activeEvent={activeEvent}
            activeStubHubEvent={activeStubHubEvent}
          />
          )}


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
            </StubHubSearchValuesProvider>
          </StubHubProvider>
        </Authorized>
      </Auth>
    );
  }
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
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </ClientContext.Provider>, document.getElementById('app'),
);
