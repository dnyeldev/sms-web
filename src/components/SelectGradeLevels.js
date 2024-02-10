import React, { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import _ from 'lodash';
import GRADE_LEVELS from '../constants/gradeLevels'
import { Controller } from 'react-hook-form';

export default function Index(payload) {
  const {
    control, formState, label = 'Interest', watch, setValue, placeholder, ...etc
  } = payload;
  const { errors } = formState;

  const watchInput = watch('gradeLevel');

  useEffect(() => {
    if (watchInput === 'invalid' || watchInput === placeholder) {
      setValue('gradeLevel', undefined);
    }
  }, [watchInput])

  return (
    <Form.Group as={Col} sm={12} controlId="subject.gradeLevel">
      <Form.Label>Grade Level</Form.Label>
      <Controller
        name="gradeLevel"
        control={control}
        rules={{ required: 'Grade level is required.' }}
        render={({ field }) => (
          <Form.Select
            isInvalid={!!_.has(errors, 'gradeLevel')}
            {...field}
          >
            <option value="invalid">Select Grade Level</option>
            {GRADE_LEVELS.map((row, key) => <option key={`gradeLevel-key-${key}`}>{row}</option>)}
          </Form.Select>
        )}
      />
      <p className="text-danger mt-1" style={{ fontSize: '.875em' }}>
        {_.has(errors, 'gradeLevel') ? errors.gradeLevel.message : ''}
      </p>
    </Form.Group>
  );
}
