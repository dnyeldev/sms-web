import React, { useCallback, useEffect, useState } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/client';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import styledComponents from 'styled-components';

const StyledRow = styledComponents(Row)`
  margin-bottom: 1rem;
  .select-search-container {
    width: auto;
  }
`;

const searchQuery = gql`
  query SearchSubscriber($search: String) {
    searchSubscriber(search: $search) {
      ... on Tutor {
        uid
        userUid
        status
        others
        priceRange
        __typename
      }
      ... on Tutee {
        uid
        userUid
        status
        others
        __typename
      }
    }
  }
`;

export default function Index(payload) {
  const {
    control,
    formState,
    label = 'Subscriber',
    watch,
    setValue,
    placeholder = 'Select Subscriber',
    onChange,
    ...etc
  } = payload;
  const { errors } = formState;
  const [search] = useState(null);

  const [fetchQuery] = useLazyQuery(searchQuery);

  const watchInput = watch('subscriber');

  useEffect(() => {
    if (onChange) { onChange(watchInput); }
  }, [watchInput, onChange]);

  const getOptions = useCallback(() => {
    async function doFetch() {
      const fetched = await fetchQuery({
        variables: { search },
      });
      const data = _.has(fetched, 'data') ? fetched.data : null;
      const result = _.has(data, 'searchSubscriber') ? data.searchSubscriber : null;

      const rows = _.map(result, (row) => {
        const userUid = _.has(row, 'userUid') ? row.userUid : null;
        const others = _.has(row, 'others') ? row.others : null;
        const firstName = _.has(others, 'firstName') ? _.startCase(others.firstName) : null;
        const lastName = _.has(others, 'lastName') ? _.startCase(others.lastName) : null;
        const fullName = `${firstName} ${lastName}`;

        return { value: userUid, name: fullName };
      });
      console.log({ rows })
      return rows;
    }

    return doFetch();
  }, [search, fetchQuery]);

  return (
    <StyledRow>
      <Form.Group as={Col} sm={6} controlId="select.subscriber">
        {label && <Form.Label>{label}</Form.Label>}
        <Controller
          name="subscriber"
          control={control}
          rules={{ required: 'Field is required.' }}
          render={({ field }) => (
            <SelectSearch
              isInvalid={!!_.has(errors, 'subscriber')}
              {...field}
              getOptions={getOptions}
              name="language"
              placeholder={placeholder}
              search
              menuPlacement="auto"
            />
          )}
          {...etc}
        />
        <Form.Control.Feedback type="invalid">
          {_.has(errors, 'subscriber') ? errors.subscriber.message : 'Invalid subscriber.'}
        </Form.Control.Feedback>
      </Form.Group>
    </StyledRow>
  );
}
