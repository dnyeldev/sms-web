import React from 'react';
import { Form } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

export default function Index(payload) {
  const { value, isInvalid, ...etc } = payload;

  return (
    <ReactDatePicker
      dateFormat="yyyy-MM-dd"
      customInput={<CustomInput isInvalid={isInvalid} />}
      selected={value}
      {...etc}
    />
  );
}

const CustomInput = React.forwardRef((props, inRef) => (
  <div className="cal-icon">
    <Form.Control className="form-control datetimepicker" ref={inRef} {...props} />
  </div>
));
