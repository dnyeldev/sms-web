import React from 'react';
import { Link } from 'react-router-dom';

export default function Index(payload) {
  const { children } = payload;

  return (
    <div className="main-wrapper">
      <div className="content" style={{ padding: '100px 0px' }}>
        <div className="account-content">
          <div className="page-wrap d-flex flex-row align-items-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                  <span className="display-1 d-block">400</span>
                  <div className="mb-4 lead">{children || 'Bad Request!'}</div>
                  <Link to="/" className="btn btn-link">Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
