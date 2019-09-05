import React, { useContext, useState } from 'react';

const StubHubContext = React.createContext([{}, () => {}]);

const StubHubProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      searchEventInput: '',
      searchVenueInput: '',
      searchEvent: '',
      searchVenue: '',
      updateSearchEnabled: true,
      timer: null,
    },
  );

  return (
    <StubHubContext.Provider value={[state, setState]}>
      {children}
    </StubHubContext.Provider>
  );
};


const useStubHub = () => {
  const [ctx, setContext] = useContext(StubHubContext);

  const set = (name) => (val) => setContext({ ...ctx, [name]: val });

  const setTimer = set('timer');

  const {
    searchEventInput, searchVenueInput, searchEvent, searchVenue, updateSearchEnabled, timer,
  } = ctx;

  const toggleUpdateSearchEnabled = () => set('updateSearchEnabled')(!updateSearchEnabled);

  const updateSearch = ({ event, venue }) => setContext({
    ...ctx,
    searchEvent: event,
    searchVenue: venue,
  });

  const updateSearchInput = ({ event, venue }) => setContext({
    ...ctx,
    searchEventInput: event,
    searchVenueInput: venue,
  });

  const delayUpdate = (data, delay) => {
    console.log(searchEventInput,searchVenueInput);
    // if (timer) { clearInterval(timer); }
    setTimeout(
      () => updateSearch(data), delay,
    );
    /*
    setTimer(setTimeout(
      () => updateSearch({ event: searchEventInput, venue: searchVenueInput }), delay,
    ));
    */
  };

  return {
    toggleUpdateSearchEnabled,
    updateSearchEnabled,
    updateSearch,
    updateSearchInput,
    delayUpdate,
    searchEventInput,
    searchVenueInput,
    searchEvent,
    searchVenue,
    set,
  };
};

export { StubHubContext, StubHubProvider, useStubHub };
