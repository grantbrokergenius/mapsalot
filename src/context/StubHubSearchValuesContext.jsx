import React from 'react';

const StubHubSearchValuesContext = React.createContext([{}, () => {}]);

const StubHubSearchValuesProvider = ({ children }) => {
  const [state, setState] = React.useState({
    event: '',
    venue: '',
    dateFrom: '',
    dateTo: '',
  });

  return (
    <StubHubSearchValuesContext.Provider value={[state, setState]}>
      {children}
    </StubHubSearchValuesContext.Provider>
  );
};

const useStubHubSearchValues = () => {
  const [values, setValues] = React.useContext(StubHubSearchValuesContext);
  const updateInputValue = (name) => (value) => setValues({ ...values, [name]: value });
  return { values, updateInputValue, setValues };
};

export { StubHubSearchValuesContext, StubHubSearchValuesProvider, useStubHubSearchValues };
