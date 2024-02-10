import React from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

export default function Index(payload) {
  const { control, formState } = payload;
  const { errors } = formState;

  return (
    <div className="row form-row">
      <Row className="mb-3">
        <Form.Group as={Col} sm={12} controlId="reg.about">
          <Form.Label>About Me</Form.Label>
          <Controller
            name="about"
            control={control}
            rules={{ required: 'About me is required.' }}
            render={({ field }) => (
              <Form.Control as="textarea" rows={10} {...field} />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {_.has(errors, 'about') ? errors.about.message : 'Invalid about me.'}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} sm={12} controlId="reg.education">
          <Form.Label>Educational Attainment</Form.Label>
          <Controller
            name="education"
            control={control}
            rules={{ required: 'Field is required.' }}
            render={({ field }) => (
              <Form.Control
                autoFocus
                isInvalid={!!_.has(errors, 'education')}
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {_.has(errors, 'education') ? errors.education.message : 'Invalid education.'}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}
