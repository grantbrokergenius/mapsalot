import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useManualQuery } from 'graphql-hooks';
import AuthContext from '../context/AuthContext';

const LOGIN_QUERY = 'query Login($email: String, $password: String) { login(email: $email, password: $password) }';

const LOGOUT_QUERY = 'query Logout { logout }';


function Auth({ activeSession, children }) {
  const [activeUser, setActiveUser] = useState(activeSession);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginQuery] = useManualQuery(LOGIN_QUERY);
  const [logoutQuery] = useManualQuery(LOGOUT_QUERY);

  const invalidate = async () => logoutQuery({}).then(() => setActiveUser(null));


  const login = async (details) => {
    const { data, error } = await loginQuery({ variables: details });
    if (error || data.login === false) {
      invalidate();
      setLoginFailed(true);
    } else {
      setActiveUser(true);
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
  activeSession: PropTypes.bool.isRequired,
};

export default Auth;
