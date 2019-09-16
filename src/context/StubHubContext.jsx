import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { yesterday, twoyears } from '../utils/date';

const StubHubContext = React.createContext([{}, () => {}]);

const StubHubProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      event: '',
      venue: '',
      dateFrom: yesterday(),
      dateTo: twoyears(),
      order: 'eventDateLocal asc', // date asc and id asc don't work :/
    },
  );

  return (
    <StubHubContext.Provider value={[state, setState]}>
      {children}
    </StubHubContext.Provider>
  );
};

StubHubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStubHub = () => {
  const [values, setValues] = useContext(StubHubContext);

  const updateSearchValue = (name) => (val) => setValues({ ...values, [name]: val });
  const update = (newValues) => setValues({
    ...values,
    ...newValues,
  });

  return {
    updateSearchValue,
    update,
    values,
  };
};

export { StubHubContext, StubHubProvider, useStubHub };
