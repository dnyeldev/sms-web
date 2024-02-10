import { useMutation } from '@apollo/client';
import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { registerStudentMutation } from './gql';
import RegistrationContext from './registration.context';
import RegistrationForm from './registrationForm';
import { LoginContext } from '../../login';

export default function Index() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userId: loginUserId } = useContext(LoginContext);

  useEffect(() => {
    if (loginUserId) {
      navigate('/');
    }
  }, [loginUserId]);

  const [register, { loading: regLoading }] = useMutation(registerStudentMutation, {
    onCompleted: async (result) => {
      const { registerStudent: data } = result;
      console.log({ data })

      navigate('/register/success');
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
      email,
      password,
      fatherName,
      fatherOccupation,
      motherName,
      motherOccupation,
      guardian,
      guardianContactNo,
      previousSchool,
      confirmPassword,
      address1,
      address2,
      city,
      postalCode,
      countryCode,
      ...etc
    } = data

    const parents = {
      fatherName, fatherOccupation, motherName, motherOccupation
    }

    const guardianInfo = {
      guardian, guardianContactNo
    }

    const address = {
      address1, address2, city, postalCode, countryCode
    }

    const user = {
      username: email,
      password,
      profile: {
        email,
        parents,
        guardian: guardianInfo,
        others: { previousSchool },
        address,
        ...etc
      }
    }

    register({
      variables: { user },
    });
  }, [register]);

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
