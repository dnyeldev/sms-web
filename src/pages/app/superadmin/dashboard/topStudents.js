import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { CustomTable, Ratings, DatePicker } from '../../../components';
import { GET_TOP_STUDENTS_RATING } from './gql';

export default function topTutors() {
  const [limit] = useState(10);
  const [monthYear, setMonthYear] = useState(new Date());

  const { data, loading } = useQuery(GET_TOP_STUDENTS_RATING, {
    variables: {
      limit,
      dateRange: {
        startDate: monthYear ? moment(monthYear).startOf('month').format('YYYY-MM-DD') : null,
        endDate: monthYear ? moment(monthYear).endOf('month').format('YYYY-MM-DD') : null,
      },
    },
  });

  const dataResult = _.has(data, 'getTopStudentsRating') ? data.getTopStudentsRating : [];

  const columns = [
    {
      title: 'Name',
      dataKey: 'tutee',
      render: (text, row) => {
        const tuteeDetails = _.has(row, 'tutee') ? row.tutee : null;
        const others = _.has(tuteeDetails, 'others') ? tuteeDetails.others : null;
        const firstName = _.has(others, 'firstName') ? others.firstName : null;
        const lastName = _.has(others, 'lastName') ? others.lastName : null;

        return (
          <span>
            {firstName}
            {' '}
            {lastName}
          </span>
        );
      },
    },
    {
      title: 'Rating',
      dataKey: 'averageRating',
      render: (text) => <Ratings readonly defaultValues={text} />,
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
          <h5 className="card-title">Top 10 Students</h5>
          <div>
            <DatePicker
              selected={monthYear}
              onChange={(update) => {
                setMonthYear(update);
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
            />
          </div>
        </div>
        <div className="table-responsive">
          <CustomTable
            loading={loading}
            columns={columns}
            dataValues={dataResult}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}
