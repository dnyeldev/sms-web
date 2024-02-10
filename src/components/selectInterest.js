import React, { useEffect, useState } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

const getInterestQuery = gql`
  query GetAllInterest($status: String) {
    getAllInterest(status: $status) {
      id
      uid
      title
      description
      status
    }
  }
`;

export default function Index(payload) {
  const {
    control, formState, label = 'Interest', watch, setValue, placeholder, ...etc
  } = payload;
  const { errors } = formState;
  const [interests, setInterests] = useState([]);

  const { data } = useQuery(getInterestQuery, {
    variables: { status: 'PUBLISHED' },
  });

  const watchInput = watch('interest');

  useEffect(() => {
    if (watchInput === 'Select Interest' || watchInput === placeholder) {
      setValue('interest', undefined);
    }
  }, [watchInput]);

  useEffect(() => {
    const getAllInterest = _.has(data, 'getAllInterest') ? data.getAllInterest : [];
    setInterests(getAllInterest);
  }, [data]);

  return (
    <Row className="mb-3">
      <Form.Group as={Col} sm={12} controlId="select.interest">
        {label && <Form.Label>{label}</Form.Label>}
        <Controller
          name="interest"
          control={control}
          rules={{ required: 'Field is required.' }}
          render={({ field }) => (
            <Form.Select
              isInvalid={!!_.has(errors, 'interest')}
              {...field}
            >
              <option value={undefined}>{placeholder || 'Select Interest'}</option>
              {
                interests.map((i) => {
                  const uid = _.has(i, 'uid') ? i.uid : null;
                  const title = _.has(i, 'title') ? i.title : null;

                  return <option value={uid}>{title}</option>;
                })
              }
            </Form.Select>
          )}
          {...etc}
        />
        <Form.Control.Feedback type="invalid">
          {_.has(errors, 'interest') ? errors.interest.message : 'Invalid interest.'}
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
}
