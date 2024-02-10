import React, {
  createContext,
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ls from 'local-storage';
import { useMutation } from '@apollo/client';
import { AlertError, LoadingSpinner } from '../../components';
import LoginContext from './login.context';
import auth from '../../authEmulatorConnect';
import { verificationEmailSentMutation } from './gql';
import RegistryClient from '../../RegistryClient';

export { default as LoginContext } from './login.context';
const PageContext = createContext();

export default function Login() {
  const {
    userUid, email, emailVerified, emailSent, setEmailSent,
  } = useContext(LoginContext);
  const navigate = useNavigate();
  const [gUser, setGUser] = useState(null)

  const [sendEmail] = useMutation(verificationEmailSentMutation, {
    client: RegistryClient,
    onCompleted: () => {
      ls.set('emailSent', true);
      setEmailSent(true);
    },
  })

  useEffect(() => {
    if (userUid && !emailVerified) {
      const user = auth.currentUser;
      setGUser(user);
      if (user && !emailSent) {
        sendEmailVerification(user)
        sendEmail({ variables: { userUid } })
      }
    } else {
      navigate('/', { replace: true });
    }
  }, [email, emailVerified]);

  const refreshPage = useCallback(() => {
    window.location.reload()
  })

  const contextPayload = useMemo(() => ({
    gUser,
  }), [gUser]);

  return (
    <PageContext.Provider value={contextPayload}>
      <div className="bg-pattern-style" style={{ marginTop: '100px' }}>
        <div className="content">
          <div className="account-content">
            <div className="account-box">
              <div className="login-right">
                <div className="login-header">
                  <h3>
                    Verify Email
                  </h3>
                </div>

                <p className="text-muted mb-3">
                  Your account has not yet been verified.
                  Please verify through the link that we have sent to your email
                  {' '}
                  {email}
                  .
                </p>

                <p className="text-muted">
                  <ResendEmail />
                  <SignInAnother />
                  <br />
                  <Button
                    variant="link"
                    onClick={refreshPage}
                    size="small"
                  >
                    <FontAwesomeIcon icon={solid('refresh')} />
                    {' '}
                    Refresh Page
                  </Button>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageContext.Provider>
  );
}

function ResendEmail() {
  const { gUser } = useContext(PageContext);
  const [emailSent, setEmailSent] = useState(false);
  const { userUid } = useContext(LoginContext);
  const [error, setError] = useState(null)

  const [sendEmail, { loading }] = useMutation(verificationEmailSentMutation, {
    client: RegistryClient,
    onCompleted: () => {
      ls.set('emailSent', true);
      setEmailSent(true);
    },
  })

  const resendEmail = useCallback(() => {
    async function doSend() {
      try {
        await sendEmailVerification(gUser);
        sendEmail({ variables: { userUid } });
      } catch (err) {
        setError(err.toString())
      }
    }

    doSend();
  });

  return (
    <div>
      {error && <AlertError error={error} onClose={() => setError(null)} />}
      {
        emailSent ? (
          <p className="text-success">
            <FontAwesomeIcon icon={solid('paper-plane')} />
            {' '}
            Email Sent!
          </p>
        ) : (
          <Button
            variant="link"
            onClick={resendEmail}
            size="small"
            disabled={loading}
          >
            <FontAwesomeIcon icon={solid('envelope')} />
            {' '}
            {loading ? <LoadingSpinner /> : 'Resend Email'}
          </Button>
        )
      }
    </div>
  );
}

function SignInAnother() {
  const { logout } = useContext(LoginContext);

  return (
    <Button variant="link" onClick={logout} size="small">
      <FontAwesomeIcon icon={solid('users')} />
      {' '}
      Sign-in Another Account
    </Button>
  );
}
