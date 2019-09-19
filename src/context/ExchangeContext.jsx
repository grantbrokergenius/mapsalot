import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { yesterday, twoyears } from '../utils/date';

const ExchangeContext = React.createContext([{}, () => {}]);

const ExchangeProvider = ({ children }) => {
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
    <ExchangeContext.Provider value={[state, setState]}>
      {children}
    </ExchangeContext.Provider>
  );
};

ExchangeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useExchange = () => {
  const [values, setValues] = useContext(ExchangeContext);

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

export { ExchangeContext, ExchangeProvider, useExchange };
