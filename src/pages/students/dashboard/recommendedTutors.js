import { useQuery } from '@apollo/client';
import React, {
  useEffect, useMemo, useState,
} from 'react';
import _ from 'lodash';
import { getTopFiveQuery } from './gql';
import { CustomTable, DynamicAvatar, Ratings } from '../../../components';
import { Link } from 'react-router-dom';

export default function Index() {
  const [tutors, setTutors] = useState([]);

  const { data, loading } = useQuery(getTopFiveQuery)

  useEffect(() => {
    const topFive = _.has(data, 'getTopFive') ? data.getTopFive : []

    setTutors(topFive)
  }, [data]);

  const columns = useMemo(() => [
    {
      title: 'Tutor',
      dataKey: 'document',
      render: (doc, row) => {
        const firstName = _.has(doc, 'firstName') ? _.startCase(doc.firstName) : null
        const lastName = _.has(doc, 'lastName') ? _.startCase(doc.lastName) : null
        const fullName = `${firstName} ${lastName}`
        const tutorUserUid = _.has(row, 'referenceUid') ? row.referenceUid : null

        return <RenderTutor fullName={fullName} tutorUserUid={tutorUserUid} />
      }
    },
    {
      title: 'Ratings',
      dataKey: 'document',
      render: (doc) => {
        const rating = _.has(doc, 'rating') ? doc.rating : null

        return <Ratings readonly defaultValues={rating} />
      }
    },
    // {
    //   title: 'Price',
    //   dataKey: 'document',
    //   render: (doc) => {
    //     const minPrice = _.has(doc, 'minPrice') ? doc.minPrice : null
    //     const maxPrice = _.has(doc, 'maxPrice') ? doc.maxPrice : null
    //     const priceRange = minPrice && maxPrice ? `₱${minPrice} - ₱${maxPrice}` : ''

    //     return priceRange
    //   }
    // }
  ]);

  return (
    <CustomTable
      columns={columns}
      dataValues={tutors}
      pagination={false}
      loading={loading}
    />
  );
}

function RenderTutor(payload) {
  const { tutorUserUid, fullName } = payload

  return (
    <Link to={`/profile/${tutorUserUid}`}>
      <h2 className="table-avatar">
        <DynamicAvatar
          className="m-1"
          userUid={tutorUserUid}
          roleCode="TUTOR"
          size="small"
          noClick
        />
        <span className="m-1" style={{ fontSize: '18px' }}>
          {fullName}
        </span>
      </h2>
    </Link>
  );
}
