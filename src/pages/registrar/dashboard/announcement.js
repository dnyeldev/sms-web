import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { GET_ANNOUNCEMENTS } from './gql'
import { useQuery } from '@apollo/client'
import _ from 'lodash'
import moment from 'moment'
import { LoadingSpinner } from '../../../components'

export default function announcement() {
  const [announcements, setAnnouncements] = useState([])
  const { data, loading } = useQuery(GET_ANNOUNCEMENTS)

  useEffect(() => {
    const iRecords = _.has(data, 'getTopAnnouncements')
      ? data.getTopAnnouncements
      : []

    setAnnouncements(iRecords)
  }, [data])

  const bgDate = {
    width: '210px'
  }
  const cardSize = {
    height:'250px'
  }
  return (
    <Card>
      <Card.Header>
        <h3>Announcement:</h3>
      </Card.Header>
      <Card.Body class="overflow-scroll" style={cardSize}>
        {loading && <LoadingSpinner />}
        {!announcements.length && <RenderEmpty />}
        {_.map(announcements, (i) => {
          const date = _.has(i, 'createdAt')
            ? moment(i.createdAt).format('lll')
            : null

          const message = _.has(i, 'message') ? i.message : null

          return (
            <Row>
              <Col className='m-2 border-bottom'>
                <div className='m-2'>
                  {' '}
                  <div
                    className='bg-primary p-1 text-center text-white rounded-pill'
                    style={bgDate}
                  >
                    {date}
                  </div>
                </div>
                <p>{message}</p>
              </Col>
            </Row>
          )
        })}
      </Card.Body>
    </Card>
  )
}

const RenderEmpty = () => {
  return (
    <div>
      <p>
        Empty Result
        <br />
        <span className='text-muted'>
          Please standby for more announcements
        </span>
      </p>
    </div>
  )
}
