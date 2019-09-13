import React, { useContext, useState } from 'react';

const StubHubContext = React.createContext([{}, () => {}]);

const StubHubProvider = ({ children }) => {
  const [state, setState] = useState(
    {
      event: '',
      venue: '',
      dateFrom: '',
      dateTo: '',
    },
  );

  return (
    <StubHubContext.Provider value={[state, setState]}>
      {children}
    </StubHubContext.Provider>
  );
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
