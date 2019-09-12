import React, { useContext, useState } from 'react';

const StubHubSearchFieldsContext = React.createContext([{}, () => {}]);

const StubHubSearchFieldsProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      searchEventInput: '',
      searchVenueInput: '',
      dateFromInput: '',
      dateToInput: '',
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
    searchEventInput, searchVenueInput, dateFromInput, dateToInput, updateSearchEnabled,
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
    dateFromInput,
    dateToInput,
    set,
  };
};

export { StubHubSearchFieldsContext, StubHubSearchFieldsProvider, useStubHubSearchFields };
