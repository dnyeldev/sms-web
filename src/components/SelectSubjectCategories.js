import React, { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import _ from 'lodash';

import SUBJECT_CATEGORIES from '../constants/subjectCategories'
import { Controller } from 'react-hook-form';

export default function Index(payload) {
  const {
    control, formState, label = 'Subject Category', watch, setValue, placeholder, ...etc
  } = payload;
  const { errors } = formState;

  const watchInput = watch('category');

  useEffect(() => {
    if (watchInput === 'invalid' || watchInput === placeholder) {
      setValue('category', undefined);
    }
  }, [watchInput])

  return (
    <Form.Group as={Col} sm={12} controlId="subject.category">
      <Form.Label>{label}</Form.Label>
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Subject category is required.' }}
        render={({ field }) => (
          <Form.Select
            isInvalid={!!_.has(errors, 'category')}
            {...field}
          >
            <option value="invalid">Select Subject Category</option>
            {SUBJECT_CATEGORIES.map((cat, key) => <option key={`sub-key-${key}`}>{cat}</option>)}
          </Form.Select>
        )}
      />
      <p className="text-danger mt-1" style={{ fontSize: '.875em' }}>
        {_.has(errors, 'category') ? errors.category.message : ''}
      </p>
    </Form.Group>
  );
}
