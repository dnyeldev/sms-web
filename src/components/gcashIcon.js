/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import GcashPng from '../assets/payments/gcash2.png';

function GcashElement(props) {
  // eslint-disable-next-line react/prop-types
  const { className, ...etc } = props;

  return (
    <img className={className} src={GcashPng} alt="Gcash Payment" {...etc} />
  );
}

export default styled(GcashElement)`
  width: 70px;
  height: auto;
  object-fit: cover;
  top: -2px;
  position: relative;
`;
