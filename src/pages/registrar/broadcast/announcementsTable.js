/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomTable, LoadingSpinner } from '../../../components'
import styledComponents from 'styled-components'
import { useQuery } from '@apollo/client'
import AnnouncementModal from './announcementModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { GET_ANNOUNCEMENTS, getUser } from './gql'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const [announcements, setAnnouncements] = useState([])

  const { data, loading } = useQuery(GET_ANNOUNCEMENTS)

  useEffect(() => {
    const iRecords = _.has(data, 'getAnnouncements')
      ? data.getAnnouncements
      : []

    setAnnouncements(iRecords)
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
          <AnnouncementModal id={id}>
            <FontAwesomeIcon icon={solid('edit')} />
            {` `}
            EDIT
          </AnnouncementModal>
        )
      }
    }
  ])

  return (
    <>
      <h3 className='pb-3'>Announcements</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              <AnnouncementModal>
                <FontAwesomeIcon icon={solid('plus')} />
                {` `}
                Create Announcement
              </AnnouncementModal>
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={announcements}
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
