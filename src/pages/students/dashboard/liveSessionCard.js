import { useLazyQuery } from '@apollo/client';
import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import styledComponents from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../login';
import { getStudentLiveSessionQuery } from './gql';

const PageContext = createContext();

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
    background-color: rgba(249, 206, 35, 0.1);
    border: 1px solid #f9e188;
  }
`;

const LiveDiv = styledComponents.div`
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
  const [status, setStatus] = useState('success');
  const { instanceUid } = useContext(LoginContext);
  const [sessionUid, setSessionUid] = useState(null);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const [fetchSession] = useLazyQuery(getStudentLiveSessionQuery, {
    pollInterval: 10000,
  });

  useEffect(() => {
    if (instanceUid) {
      fetchSession({ variables: { instanceUid } })
        .then(({ data }) => {
          const liveSession = _.has(data, 'getStudentLiveSession') ? data.getStudentLiveSession : null;
          const iSessionUid = _.has(liveSession, 'uid') ? liveSession.uid : null;

          setSessionUid(iSessionUid);
          setSession(liveSession);

          if (liveSession) { setStatus('success'); } else { setStatus('danger'); }
        });
    }
  }, [instanceUid, fetchSession, setSession, setSessionUid]);

  const contextPayload = useMemo(() => ({
    session,
  }), [session]);

  const goToSession = useCallback(() => {
    if (sessionUid) { navigate('/session', { state: { sessionUid } }); }
  });

  return (
    <PageContext.Provider value={contextPayload}>
      <LiveDiv onClick={goToSession}>
        <Alert variant={status}>
          <Row className="mt-3 mb-3">
            <Col xs={3} lg={1}>
              <CircledIcon className="icon">
                <div className={`icon__col icon__col--${status}`}>
                  <i className="fas fa-users" />
                </div>
              </CircledIcon>
            </Col>
            <Col xs={9} lg={11}>
              {status === 'success' ? <ActiveContent /> : <InavtiveCard />}
            </Col>
          </Row>
        </Alert>
      </LiveDiv>
    </PageContext.Provider>
  );
}

function InavtiveCard() {
  return (
    <>
      <Alert.Heading>No Live Session</Alert.Heading>
      <div className="dash-widget-info">
        <h6>There is no active session at this moment.</h6>
      </div>
    </>
  );
}

function ActiveContent() {
  const { session } = useContext(PageContext);
  const [interest, setInterest] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    const startDate = _.has(session, 'startDate') ? moment(session.startDate).format('lll') : null;
    const endDate = _.has(session, 'endDate') ? moment(session.endDate).format('lll') : null;
    const iInterest = _.has(session, 'interest') ? session.interest : null;

    setStart(startDate);
    setEnd(endDate);
    setInterest(iInterest);
  }, [session]);

  return (
    <>
      <Alert.Heading>Live Session</Alert.Heading>
      <div className="dash-widget-info">
        <h5>{interest}</h5>
        <h6>
          {start}
          {' '}
          -
          {' '}
          {end}
        </h6>
      </div>
    </>
  );
}
