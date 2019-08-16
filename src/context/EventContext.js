import React from 'react';

export default React.createContext({
  activeEventId: null,
  activeStubHubEventId: null,
  setActiveEventId: () => {},
  stubhubSearchEvent: '',
  stubhubSearchVenue: '',
  updateSearchEnabled: true,
  toggleUpdateSearchEnabled: () => {},
  updateSearch: () => {},
});
