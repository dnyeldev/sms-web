import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { DashboardTemplate } from '../../../template/components'
import UsersContext from './sections.context'
import SectionStudents from './sectionStudents'
import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import styledComponents from 'styled-components'
import AppContext from '../../app/app.context'
import { useQuery } from '@apollo/client'
import { GET_SECTION } from './gql'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

const StyledHeader = styledComponents.h3`

`

export default function Index() {
  const { schoolYearId, sectionId } = useContext(AppContext)
  const [sectionName, setSectionName] = useState(null)
  const [gradeLevel, setGradeLevel] = useState(null)
  const [sectionAdviser, setSectionAdviser] = useState(null)

  const { data, loading } = useQuery(GET_SECTION, {
    skip: !sectionId,
    variables: { id: sectionId }
  })

  useEffect(() => {
    if (data) {
      const section = _.has(data, 'getSection') ? data.getSection : null
      const iSectionName = _.has(section, 'name') ? section.name : null
      const iGradeLevel = _.has(section, 'gradeLevel')
        ? section.gradeLevel
        : null
      const adviser = _.has(section, 'adviser') ? section.adviser : null
      const adviserProfile = _.has(adviser, 'profile') ? adviser.profile : null
      const adviserFirstName = _.has(adviserProfile, 'firstName')
        ? adviserProfile.firstName
        : null
      const adviserLastName = _.has(adviserProfile, 'lastName')
        ? adviserProfile.lastName
        : null
      const adviserName = `${adviserFirstName} ${adviserLastName}`

      setSectionName(iSectionName)
      setGradeLevel(iGradeLevel)
      setSectionAdviser(adviserName)
    }
  }, [data])

  const contextPayload = useMemo(
    () => ({
      sectionId,
      schoolYearId
    }),
    [sectionId, schoolYearId]
  )

  return (
    <DashboardTemplate>
      <UsersContext.Provider value={contextPayload}>
        <StyledRow>
          <Col>
            <Card>
              <Card.Header>
                {/* <h3 className='pb-3'>Section</h3> */}
                <StyledHeader>Section</StyledHeader>
              </Card.Header>
              <Card.Body>
                <ListGroup as='ul'>
                  <ListGroup.Item
                    as='li'
                    className='d-flex justify-content-between align-items-start'
                  >
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>Section Name</div>
                      {sectionName}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as='li'
                    className='d-flex justify-content-between align-items-start'
                  >
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>Grade Level</div>
                      {gradeLevel}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as='li'
                    className='d-flex justify-content-between align-items-start'
                  >
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>Adviser</div>
                      {sectionAdviser}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </StyledRow>
        <SectionStudents />
      </UsersContext.Provider>
    </DashboardTemplate>
  )
}
