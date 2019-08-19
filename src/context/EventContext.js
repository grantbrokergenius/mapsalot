import React from 'react';

export default React.createContext({
  activeEvent: null,
  activeStubHubEvent: null,
  setActiveEvent: () => {},
  hasActiveEvent: () => {},
  getActiveEventId: () => {},
  setActiveStubHubEvent: () => {},
  getActiveStubHubEventId: () => {},
  stubhubSearchEvent: '',
  stubhubSearchVenue: '',
  updateSearchEnabled: true,
  toggleUpdateSearchEnabled: () => {},
  updateSearch: () => {},
});
