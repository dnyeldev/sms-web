/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Button,
  Card, Col, Row,
} from 'react-bootstrap';
import { CustomTable } from '../../../components';
import UsersContext from './subjects.context';
import styledComponents from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GET_SUBJECTS } from './gql';
import { useQuery } from '@apollo/client';
import CreateSubjectModal from './createSubjectModal'
import ChangeStatus from './changeStatus'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`;

export default function Index() {
  const {
    userId
  } = useContext(UsersContext);
  const navigate = useNavigate()

  const [sections, setSections] = useState([]);

  const { data, loading } = useQuery(GET_SUBJECTS);

  useEffect(() => {
    const iSections = _.has(data, 'getSubjects') ? data.getSubjects : [];
    // console.log({ iSections })
    setSections(iSections);
  }, [data]);

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataKey: 'name'
    },
    {
      title: 'Grade Level',
      dataKey: 'gradeLevel',
    },
    {
      title: 'Subject Category',
      dataKey: 'category'
    },
  ]);

  return (
    <>
      <h3 className="pb-3">Subjects</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              <CreateSubjectModal />
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={sections}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  );
}