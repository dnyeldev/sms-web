import { useQuery } from '@apollo/client';
import React, {
  useContext,
  useEffect, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { getUserQuery } from './gql';
import PageContext from './page.context';
import View from './view';
import { Row, Col } from 'react-bootstrap';
import { DashboardTemplate } from '../../template/components';
import LoginContext from '../login/login.context';

export default function Index() {
  const { userId } = useContext(LoginContext);
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
