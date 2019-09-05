import React, { useContext, useState } from 'react';

const StubHubContext = React.createContext([{}, () => {}]);

const StubHubProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      searchEvent: '',
      searchVenue: '',
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
    searchEvent, searchVenue, timer,
  } = ctx;

  const updateSearch = ({ event, venue }) => setContext({
    ...ctx,
    searchEvent: event,
    searchVenue: venue,
  });

  const delayUpdate = (data, delay) => {
    if (timer) { clearInterval(timer); }
    setTimer(setTimeout(
      () => updateSearch(data), delay,
    ));
  };

  return {
    updateSearch,
    delayUpdate,
    searchEvent,
    searchVenue,
    set,
  };
};

export { StubHubContext, StubHubProvider, useStubHub };
