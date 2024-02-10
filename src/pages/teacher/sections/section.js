import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'
import { DashboardTemplate } from '../../../template/components'
import UsersContext from './sections.context'
import SectionStudents from './sectionStudents'
import SelectEnrollmentSY from '../../../components/SelectEnrollmentSY'
import { Card, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import styledComponents from 'styled-components'
import SelectSubject from '../../../components/SelectSubject'
import SectionSubjects from './sectionSubjects'
import AppContext from '../../../pages/app/app.context'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const location = useLocation()
  const {
    state: { sectionId: wSectionId }
  } = location
  const [sectionId, setSectionId] = useState(null)
  const [sectionSubjectId, setSectionSubjectId] = useState(null)
  const { schoolYearId } = useContext(AppContext)

  const formInstant = useForm()
  const { watch } = formInstant

  const wSchoolYearId = watch('schoolYearId')

  useEffect(() => {
    const iSectionId = wSectionId ? parseInt(wSectionId) : null
    // const iSchoolYearId = wSchoolYearId ? parseInt(wSchoolYearId) : null

    // setSchoolYearId(iSchoolYearId)
    setSectionId(iSectionId)
  }, [wSectionId])

  const contextPayload = useMemo(
    () => ({
      sectionId,
      schoolYearId,
      sectionSubjectId,
      setSectionSubjectId
    }),
    [sectionId, schoolYearId, sectionSubjectId, setSectionSubjectId]
  )

  return (
    <DashboardTemplate>
      <UsersContext.Provider value={contextPayload}>
        <StyledRow>
          <Col>
            <Card>
              <Card.Header>
                <h3 className='pb-3'>Section</h3>
              </Card.Header>
              <Card.Body>
                {/* <Row>
                  <Col lg={4}>
                    <SelectEnrollmentSY label='School Year' {...formInstant} />
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col lg={4}>
                    <SelectSubject label='Subject' {...formInstant} />
                  </Col>
                </Row> */}
              </Card.Body>
            </Card>
          </Col>
        </StyledRow>
        <SectionSubjects />
        <SectionStudents />
      </UsersContext.Provider>
    </DashboardTemplate>
  )
}
