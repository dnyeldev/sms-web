import React, {
  useCallback, useMemo, useState,
} from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import ls from 'local-storage';
import { useNavigate } from 'react-router-dom';
import Context from './login.context';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_API

export default function Index({ children }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(ls.get('userId'));
  const [username, setUsername] = useState(ls.get('username'));
  const [roleCode, setRoleCode] = useState(ls.get('roleCode'));

  const clearLogin = () => {
    setUserId(null)
    setUsername(null);
    setRoleCode(null);

    return true;
  };

  const logout = useCallback(() => {
    // User is signed out
    axios.post(`${API}/logout`).then(() => {
      // Sign-out successful.
      ls.clear();
      clearLogin();

      navigate('/', { replace: true });
    });
  }, [userId]);

  const contextPayload = useMemo(() => ({
    userId, setUserId,
    setUsername,
    roleCode,
    setRoleCode,
    clearLogin,
    logout,
  }), [
    userId, setUserId,
    username, setUsername,
    roleCode, setRoleCode,
    clearLogin,
    logout,
  ]);

  return (
    <Context.Provider value={contextPayload}>
      {children}
    </Context.Provider>
  );
}

Index.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};
