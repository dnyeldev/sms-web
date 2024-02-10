/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomTable, LoadingSpinner } from '../../../components'
import styledComponents from 'styled-components'
import { useQuery } from '@apollo/client'
import SmsModal from './smsModal'
import ViewSmsModal from './viewSmsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { GET_TEXT_MESSAGES, getUser } from './gql'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const [messages, setMessages] = useState([])

  const { data, loading } = useQuery(GET_TEXT_MESSAGES)

  useEffect(() => {
    const iRecords = _.has(data, 'getTextMessages') ? data.getTextMessages : []

    setMessages(iRecords)
  }, [data])

  const columns = useMemo(() => [
    {
      title: 'Message',
      dataKey: 'message',
      render: (message) => {
        return _.truncate(message)
      }
    },
    {
      title: 'Created At',
      dataKey: 'createdAt'
    },
    {
      title: 'Create By',
      dataKey: 'createdBy',
      render: (createdBy) => {
        return <CreatedBy createdBy={createdBy} />
      }
    },
    {
      title: 'STATUS',
      dataKey: 'status'
    },
    {
      title: '',
      dataKey: 'id',
      render: (id) => {
        return (
          <ViewSmsModal id={id}>
            <FontAwesomeIcon icon={solid('eye')} />
            {` `}
            VIEW
          </ViewSmsModal>
        )
      }
    }
  ])

  return (
    <>
      <h3 className='pb-3'>SMS</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              <SmsModal>
                <FontAwesomeIcon icon={solid('plus')} />
                {` `}
                Create SMS Announcement
              </SmsModal>
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={messages}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  )
}

const CreatedBy = ({ createdBy }) => {
  const [name, setName] = useState(null)

  const { data, loadingUser } = useQuery(getUser, {
    variables: {
      id: createdBy
    }
  })

  useEffect(() => {
    const user = _.has(data, 'getUser') ? data.getUser : null
    const profile = _.has(user, 'profile') ? user.profile : null
    const fName = _.has(profile, 'firstName') ? profile.firstName : null
    const lName = _.has(profile, 'lastName') ? profile.lastName : null
    const fullName = `${fName} ${lName}`

    setName(fullName)
  }, [data])

  return loadingUser ? <LoadingSpinner /> : name
}
