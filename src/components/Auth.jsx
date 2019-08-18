import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useManualQuery } from 'graphql-hooks';
import AuthContext from '../context/AuthContext';

const LOGIN_QUERY = 'query Login($email: String, $password: String) { login(email: $email, password: $password) }';

function Auth({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [loginFailed, setLoginFailed] = useState(false);
  const invalidate = () => setActiveUser(null);
  const [loginQuery] = useManualQuery(LOGIN_QUERY);

  const login = async (details) => {
    const { data, error } = await loginQuery({ variables: details });
    if (error || data.login === false) {
      invalidate();
      setLoginFailed(true);
    } else {
      setActiveUser('grant');
      setLoginFailed(false);
    }
  };

  const context = {
    activeUser,
    login,
    invalidate,
    loginFailed,
  };
  return (<AuthContext.Provider value={context}>{children}</AuthContext.Provider>);
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
