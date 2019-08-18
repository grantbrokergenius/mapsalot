import React from 'react';

export default React.createContext({
  activeEvent: null,
  activeStubHubEvent: null,
  setActiveEvent: () => {},
  setActiveStubHubEvent: () => {},
  stubhubSearchEvent: '',
  stubhubSearchVenue: '',
  updateSearchEnabled: true,
  toggleUpdateSearchEnabled: () => {},
  updateSearch: () => {},
});
