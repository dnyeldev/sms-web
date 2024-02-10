import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import Ratings from './ratings';

const getTutorRatingQuery = gql`
  query GetTutorRating($tutorUid: String!) {
    getTutorRating(tutorUid: $tutorUid)
  }
`;

export default function Index(payload) {
  const { tutorUid } = payload;
  const [rating, setRating] = useState(0);
  const [fetchRating, { data }] = useLazyQuery(getTutorRatingQuery);

  useEffect(() => {
    if (tutorUid) { fetchRating({ variables: { tutorUid } }); }
  }, [tutorUid]);

  useEffect(() => {
    if (data) {
      const getTutorRating = _.has(data, 'getTutorRating') ? data.getTutorRating : 0;

      setRating(getTutorRating);
    } else {
      setRating(0);
    }
  }, [data]);

  return (
    <Ratings value={rating} readonly />
  );
}
