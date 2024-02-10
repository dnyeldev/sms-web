/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

function InputElem(props) {
  const {
    className, children, ...etc
  } = props;

  return (
    <div className={`payment-list ${className}`}>
      <label className="payment-radio paypal-option">
        <input
          type="radio"
          {...etc}
        />
        <span className="checkmark" />
        {children}
      </label>
    </div>
  );
}

export default styled(InputElem)`
  .payment-radio {
    padding-left: 21px;
  }

  .payment-radio .checkmark {
    top: 1px;
    width: 14px;
    height: 14px;
  }

  .payment-radio .checkmark::after {
    left: 1px;
    top: 1px;
    width: 8px;
    height: 8px;
  }
`;
