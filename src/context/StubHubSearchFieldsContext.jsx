import React, { useContext, useState } from 'react';

const StubHubSearchFieldsContext = React.createContext([{}, () => {}]);

const StubHubSearchFieldsProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      searchEventInput: '',
      searchVenueInput: '',
      updateSearchEnabled: true,
      timer: null,
    },
  );

  return (
    <StubHubSearchFieldsContext.Provider value={[state, setState]}>
      {children}
    </StubHubSearchFieldsContext.Provider>
  );
};


const useStubHubSearchFields = () => {
  const [ctx, setContext] = useContext(StubHubSearchFieldsContext);

  const set = (name) => (val) => setContext({ ...ctx, [name]: val });

  const {
    searchEventInput, searchVenueInput, searchEvent, searchVenue, updateSearchEnabled, timer,
  } = ctx;

  const toggleUpdateSearchEnabled = () => set('updateSearchEnabled')(!updateSearchEnabled);

  const updateSearchInput = (data) => setContext({
    ...ctx,
    ...data,
  });

  return {
    toggleUpdateSearchEnabled,
    updateSearchEnabled,
    updateSearchInput,
    searchEventInput,
    searchVenueInput,
    searchEvent,
    searchVenue,
    set,
  };
};

export { StubHubSearchFieldsContext, StubHubSearchFieldsProvider, useStubHubSearchFields };
