import React from 'react';

export default React.createContext({
  activeEventId: null,
  setActiveEventId: () => {},
  stubhubSearchEvent: '',
  stubhubSearchVenue: '',
  updateSearchEnabled: true,
  toggleUpdateSearchEnabled: () => {},
  updateSearch: () => {},
});
