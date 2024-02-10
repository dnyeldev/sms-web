import React, { useEffect, useState } from 'react';
import {
  Form,
} from 'react-bootstrap';
import _ from 'lodash';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import TicketingClient from '../TicketingClient';

const APPCODE = process.env.REACT_APP_CODE || 'LEARNLIVE_TUTORIAL';

const GET_ALL_TICKET_CATEGORY = gql`
query GetAllTicketCategory($appCode: String!) {
    getAllTicketCategory(appCode: $appCode) {
      id
      uid
      name
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

export default function Index(payload) {
  const {
    placeholder,
    onSelect,
    onChange,
    ...etc
  } = payload;
  const [categories, setCategories] = useState([]);

  const { data } = useQuery(GET_ALL_TICKET_CATEGORY, {
    client: TicketingClient,
    variables: { appCode: APPCODE },
  });

  useEffect(() => {
    const getAllTicketCategory = _.has(data, 'getAllTicketCategory') ? data.getAllTicketCategory : [];
    setCategories(getAllTicketCategory);
  }, [data]);

  return (
    <Form.Select
      {...etc}
      onChange={(val) => {
        const uid = val.target.value;
        if (onSelect) {
          const selectedCategory = _.find(categories, (item) => item.uid === uid);
          onSelect(selectedCategory);
        }
        onChange(uid);
      }}
    >
      <option value={undefined}>{placeholder || 'Select Category'}</option>
      {
        categories.map((i) => {
          const uid = _.has(i, 'uid') ? i.uid : null;
          const name = _.has(i, 'name') ? i.name : null;

          return <option value={uid}>{name}</option>;
        })
        }
    </Form.Select>
  );
}
