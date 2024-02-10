import { useMutation } from '@apollo/client';
import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { createUserMutation } from './gql';
import RegistrationContext from './registration.context';
import RegistrationForm from './registrationForm';

export default function Index() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [create, { loading: regLoading }] = useMutation(createUserMutation, {
    awaitRefetchQueries: true,
    onCompleted: async (result) => {
      const { createUserMutation: data } = result;

      navigate(-1, { replace: true });
    },
    onError: (err) => {
      const message = _.has(err, 'message') ? err.message : err.toString()
      setError(message);
    },
  });

  useEffect(() => {
    setLoading(regLoading);
  }, [regLoading]);

  const onSubmit = useCallback((data) => {
    const {
      roleCode,
      email,
      password,
      confirmPassword,
      address1,
      address2,
      city,
      postalCode,
      countryCode,
      ...etc
    } = data

    const address = {
      address1, address2, city, postalCode, countryCode
    }

    const user = {
      username: email,
      password,
      roleCode,
      profile: {
        email,
        address,
        ...etc
      }
    }

    create({
      variables: { user },
    });
  }, [create]);

  const regContextPayload = useMemo(() => ({
    onSubmit,
    error,
    setError,
    loading,
  }), [
    onSubmit,
    error, setError,
    loading,
  ]);

  return (
    <RegistrationContext.Provider value={regContextPayload}>
      <RegistrationForm />
    </RegistrationContext.Provider>
  );
}
