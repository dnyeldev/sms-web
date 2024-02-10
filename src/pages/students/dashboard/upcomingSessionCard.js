import { useLazyQuery } from '@apollo/client';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import styledComponents from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getStudentUpcomingQuery } from './gql';
import { LoginContext } from '../../login';

const CircledIcon = styledComponents.div`
  .icon__col {
    font-size: 22px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .icon__col--success {
    background-color: #94e5c0;
    border: 1px solid #00ff8b;
  }

  .icon__col--warning {
    background-color: rgba(249,206,35,0.1);
    border: 1px solid #f9e188;
  }

  .icon__col--danger {
    background-color: #ffbec4;
    border: 1px solid #ff0017;
  }
`;

const StyledDiv = styledComponents.div`
  .alert {
    box-shadow: 0px 4px 14px rgb(185 185 185 / 12%);
    border-radius: 10px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 8px #8bf79e;
    border-radius: 10px;

    .icon__col--success {
      background-color: #7ccfa9;
      border: 2px solid #00ff8b;
    }
  }
`;

export default function Index() {
  const { instanceUid } = useContext(LoginContext);
  const [sessions, setSessions] = useState([]);

  const [fetchSession] = useLazyQuery(getStudentUpcomingQuery);

  useEffect(() => {
    if (instanceUid) {
      fetchSession({ variables: { instanceUid }, pollInterval: 3000 })
        .then(({ data }) => {
          const upcoming = _.has(data, 'getStudentUpcomingSession')
            ? data.getStudentUpcomingSession : null;

          setSessions(upcoming);
        });
    }
  }, [instanceUid]);

  return (
    <Row>
      {sessions && sessions.map((i) => <SessionItem {...i} />)}
    </Row>
  );
}

function SessionItem(payload) {
  const navigate = useNavigate();
  const [status] = useState('warning');
  const sessionUid = _.has(payload, 'uid') ? payload.uid : null;
  const interest = _.has(payload, 'interest') ? payload.interest : null;
  const startDate = _.has(payload, 'startDate') ? moment(payload.startDate).format('MMM D, LT') : null;
  const endDate = _.has(payload, 'endDate') ? moment(payload.endDate).format('MMM D, LT') : null;

  const goToSession = useCallback(() => {
    if (sessionUid) { navigate('/session', { state: { sessionUid } }); }
  });

  return (
    <Col lg="4">
      <StyledDiv onClick={goToSession}>
        <Alert variant={status} style={{ boxShadow: '0px 4px 14px rgb(185 185 185 / 12%)' }}>
          <Row className="mt-2 mb-2">
            <Col xs={3} lg={3}>
              <CircledIcon className="icon">
                <div className={`icon__col icon__col--${status}`}>
                  <i className="fas fa-users" />
                </div>
              </CircledIcon>
            </Col>
            <Col xs={9} lg={9}>
              <Alert.Heading>Upcoming Session</Alert.Heading>
              <div className="dash-widget-info">
                <h6>{interest}</h6>
                <small>
                  {startDate}
                  {' '}
                  -
                  {' '}
                  {endDate}
                </small>
              </div>
            </Col>
          </Row>
        </Alert>
      </StyledDiv>
    </Col>
  );
}
