/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { CustomTable } from '../../../components'
import UsersContext from './sections.context'
import styledComponents from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { GET_SECTIONS } from './gql'
import { useQuery } from '@apollo/client'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const { userId } = useContext(UsersContext)
  const navigate = useNavigate()

  const [sections, setSections] = useState([])

  const { data, loading } = useQuery(GET_SECTIONS)

  useEffect(() => {
    const iSections = _.has(data, 'getSections') ? data.getSections : []

    setSections(iSections)
  }, [data])

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataKey: 'name',
      render: (name, row) => {
        const sectionId = _.has(row, 'id') ? row.id : null

        return (
          <Button
            variant='link'
            onClick={() =>
              navigate('/teacher/section', { state: { sectionId } })
            }
          >
            {name}
          </Button>
        )
      }
    },
    {
      title: 'Grade Level',
      dataKey: 'gradeLevel',
      center: true
    },
    {
      title: 'STATUS',
      dataKey: 'status'
    }
  ])

  return (
    <>
      <h3 className='pb-3'>Sections</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>{/* <CreateSectionModal /> */}</Card.Header>
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
  )
}
