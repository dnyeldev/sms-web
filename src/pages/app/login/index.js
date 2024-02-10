import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import ls from 'local-storage';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import LoginUser from './loginForm';
import LoginContext, { LoginPageContext } from './login.context';
import axios from 'axios';

export { default as LoginContext } from './login.context';

const API = process.env.REACT_APP_BACKEND_API

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    setUserId,
    setUsername,
    setRoleCode,
    instanceUid,
  } = useContext(LoginContext);

  if (instanceUid) {
    ls.set('instanceUid', instanceUid);
  }

  const login = (payload) => {
    axios.post(`${API}/login`, { ...payload }, { withCredentials: true })
      .then(result => {
        const data = _.has(result, 'data') ? result.data : null
        const id = _.has(data, 'id') ? data.id : null
        const username = _.has(data, 'username') ? data.username : null
        const roleCode = _.has(data, 'roleCode') ? data.roleCode : null

        ls.set('userId', id);
        ls.set('username', username);
        ls.set('roleCode', roleCode);

        setUserId(id)
        setUsername(username);
        setRoleCode(roleCode);

        setError(null);

        switch (roleCode) {
          case 'TEACHER': navigate('/teacher', { replace: true });
            break;
          case 'SCHOOL_ADMIN': navigate('/school-admin', { replace: true });
            break;
          case 'SYSTEM_ADMIN': navigate('/system-admin', { replace: true });
            break;
          case 'REGISTRAR': navigate('/registrar', { replace: true });
            break;
          default: navigate('/student');
        }
      }).catch(err => {
        const message = _.has(err, 'message') ? err.message : null
        const response = _.has(err, 'response') ? err.response : null
        const resMessage = _.has(response, 'data') ? response.data : null

        setError(resMessage || message || JSON.stringify(err));
      }).finally(() => setLoading(false))
  }

  const onSubmit = useCallback((payload) => {
    setLoading(true);

    login(payload);
  });

  const loginContextPayload = useMemo(() => ({
    loading,
    onSubmit,
    error,
    setError,
  }), [loading, onSubmit, error, setError]);

  return (
    <LoginPageContext.Provider value={loginContextPayload}>
      <LoginUser error={error} loading={loading} />
    </LoginPageContext.Provider>
  );
}
