import React from 'react';

export default React.createContext({
  activeEvent: null,
  activeExchangeEvent: null,
  setActiveEvent: () => {},
  hasActiveEvent: () => {},
  getActiveEventId: () => {},
  setActiveExchangeEvent: () => {},
  getActiveExchangeEventId: () => {},
  ExchangeSearchEvent: '',
  ExchangeSearchVenue: '',
  updateSearchEnabled: true,
  toggleUpdateSearchEnabled: () => {},
  updateSearch: () => {},
});
