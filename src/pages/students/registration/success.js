import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Index() {
  return (
    <div className="bg-pattern-style bg-pattern-style-register">
      <div className="content">

        <div className="account-content">
          <div className="account-box">
            <div className="login-right">
              <div className="login-header">
                <h3>
                  <FontAwesomeIcon icon={regular('circle-check')} />
                  {' '}
                  <span>Registration</span>
                  {' '}
                  Success
                </h3>
                <br />
                <p className="text-muted">Admission Form Sent. Please wait for a few days to confirm your registration.</p>
              </div>

              <div className="account-footer mt-3">
                <FontAwesomeIcon icon={regular('circle-left')} />
                {' '}
                <a className="forgot-link mb-0" href="/">Back Home</a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
