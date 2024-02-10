/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Index(payload) {
  const { text = 'Loading...', ...etc } = payload;

  return (
    <>
      <Spinner
        animation="border"
        role="status"
        as="div"
        aria-hidden="true"
        size="sm"
        style={{ color: '#FE9445' }}
        {...etc}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {' '}
      {text}
    </>
  );
}
