import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Button,
  Modal
} from 'react-bootstrap';
import _ from 'lodash'
import { useMutation, useQuery } from '@apollo/client';
import View from './view'
import { changeUserStatusMutation, getUserQuery } from './gql';
import PageContext from './page.context'

export default function modalConfirm({ children, userId }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: userResult, loading: loadingUser } = useQuery(getUserQuery, {
    skip: !userId,
    variables: { id: userId }
  })

  const [approve, { loading: loadingApproval }] = useMutation(changeUserStatusMutation, {
    onCompleted() {
      setVisible(false)
    }
  })

  useEffect(() => {
    if (loadingUser || loadingApproval)
      setLoading(true)
    else
      setLoading(false)
  }, [loadingUser, loadingApproval])

  useEffect(() => {
    const user = _.has(userResult, 'getUser') ? userResult.getUser : null
    const status = _.has(user, 'status') ? user.status : null

    setUser(user)
    setStatus(status)
  }, [userResult])

  const handleShow = useCallback(() => {
    setVisible(true)
  }, [children])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [children])

  const handleApprove = useCallback(() => {
    const variables = { id: userId, status: 'ACTIVE' }

    approve({ variables })
  }, [children])

  const contextPayload = useMemo(() => ({ user }), [user])

  return (
    <>
      {children({ onClick: handleShow })}
      <Modal size='lg' show={visible} onHide={() => setVisible(false)} centered loading={loading}>
        <Modal.Header closeButton>
          <Modal.Title>View Registration Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <PageContext.Provider value={contextPayload}>
            <View />
          </PageContext.Provider>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="link">Close</Button>
          {status === 'FOR_APPROVAL' && <Button onClick={handleApprove} variant="primary">Approve</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
