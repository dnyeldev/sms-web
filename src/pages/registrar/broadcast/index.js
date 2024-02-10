import React, { useContext, useMemo } from 'react'
import _ from 'lodash'
import { DashboardTemplate } from '../../../template/components'
import { LoginContext } from '../../login'
import BroadcastContext from './broadcast.context'
import AnnouncementTable from './announcementsTable'
import { Row, Col } from 'react-bootstrap'
import SmsTable from './smsTable'

export default function Index() {
  const { userId } = useContext(LoginContext)

  const contextPayload = useMemo(
    () => ({
      userId
    }),
    [userId]
  )

  return (
    <DashboardTemplate>
      <BroadcastContext.Provider value={contextPayload}>
        <Row>
          <Col>
            <AnnouncementTable />
          </Col>
        </Row>
        <Row>
          <Col>
            <SmsTable />
          </Col>
        </Row>
      </BroadcastContext.Provider>
    </DashboardTemplate>
  )
}
