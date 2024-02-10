import { useQuery } from '@apollo/client';
import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { getUserQuery } from './gql';
import PageContext from './page.context';
import View from './view';
import { Row, Col } from 'react-bootstrap';
import { DashboardTemplate } from '../../../../template/components';

export default function Index() {
  const location = useLocation()
  const { state: { userId } } = location

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)


  const { loading: fetchLoading, data } = useQuery(getUserQuery, {
    skip: !userId,
    variables: { id: userId }
  });

  useEffect(() => {
    const result = _.has(data, 'getUser') ? data.getUser : null

    setUser(result)
  }, [data])

  const contextPayload = useMemo(() => ({
    user
  }), [
    user
  ]);

  return (
    <DashboardTemplate>
      <PageContext.Provider value={contextPayload}>
        <Row>
          <Col><View /></Col>
        </Row>
      </PageContext.Provider >
    </DashboardTemplate>
  );
}
