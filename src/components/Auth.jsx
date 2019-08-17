import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../context/AuthContext';


function Auth({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const invalidate = () => setActiveUser(null);
  const login = (username, password) => {
      return fetch('/login', { username, password });

  };
  const context = {
    activeUser,
    login,
    invalidate,
  };
  return (<AuthContext.Provider value={context}>{children}</AuthContext.Provider>);
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
