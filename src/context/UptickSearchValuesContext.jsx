import React from 'react';
import PropTypes from 'prop-types';

const UptickSearchValuesContext = React.createContext([{}, () => {}]);

const UptickSearchValuesProvider = ({ children }) => {
  const [state, setState] = React.useState({
    event: '',
    venue: '',
  });

  return (
    <UptickSearchValuesContext.Provider value={[state, setState]}>
      {children}
    </UptickSearchValuesContext.Provider>
  );
};

UptickSearchValuesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUptickSearchValues = () => {
  const [values, setValues] = React.useContext(UptickSearchValuesContext);
  const updateInputValue = (name) => (value) => setValues({ ...values, [name]: value });
  return { values, updateInputValue, setValues };
};

export { UptickSearchValuesContext, UptickSearchValuesProvider, useUptickSearchValues };
