import React from 'react';
import PropTypes from 'prop-types';

const StubHubSearchValuesContext = React.createContext([{}, () => {}]);

const StubHubSearchValuesProvider = ({ children }) => {
  const [state, setState] = React.useState({
    event: '',
    venue: '',
  });

  return (
    <StubHubSearchValuesContext.Provider value={[state, setState]}>
      {children}
    </StubHubSearchValuesContext.Provider>
  );
};

StubHubSearchValuesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStubHubSearchValues = () => {
  const [values, setValues] = React.useContext(StubHubSearchValuesContext);
  const updateInputValue = (name) => (value) => setValues({ ...values, [name]: value });
  return { values, updateInputValue, setValues };
};

export { StubHubSearchValuesContext, StubHubSearchValuesProvider, useStubHubSearchValues };
