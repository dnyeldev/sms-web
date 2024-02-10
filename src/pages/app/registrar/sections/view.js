/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { GET_SECTION } from './gql'
import { useQuery } from '@apollo/client'
import styledComponents from 'styled-components'
import { DashboardTemplate } from '../../../template/components'
import SectionStudents from './sectionStudents'
import AddSectionAdviser from './addSectionAdviser'
import SectionContext from './sections.context'
import SelectSchoolYears from '../../../components/SelectEnrollmentSY'
import { useForm } from 'react-hook-form'
import SectionSubjects from './sectionSubjects'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

const SubTitle = styledComponents.span`
  font-size: 16px;
  color: #757575;
`

const ItemTitle = styledComponents.p`
 font-size: 16px;
 color: #757575;
 line-height: 2;
`

export default function Index() {
  const [title, setTitle] = useState(null)
  const location = useLocation()
  const {
    state: { sectionId }
  } = location
  const [adviser, setAdviser] = useState(null)
  const [gradeLevel, setGradeLevel] = useState(null)
  const formInstant = useForm()
  const { watch } = formInstant

  const schoolYearId = watch('schoolYearId')

  const { data, loading } = useQuery(GET_SECTION, {
    skip: !sectionId,
    variables: { id: sectionId }
  })

  useEffect(() => {
    const section = _.has(data, 'getSection') ? data.getSection : null
    const iTitle = _.has(section, 'name') ? section.name : null
    const iAdviser = _.has(section, 'adviser') ? section.adviser : null
    const iGradeLevel = _.has(section, 'gradeLevel') ? section.gradeLevel : null
    const iProfile = _.has(iAdviser, 'profile') ? iAdviser.profile : null
    const firstName = _.has(iProfile, 'firstName') ? iProfile.firstName : null
    const lastName = _.has(iProfile, 'lastName') ? iProfile.lastName : null
    const fullName = `${firstName} ${lastName}`

    setTitle(iTitle)
    setGradeLevel(iGradeLevel)

    if (iAdviser) setAdviser(fullName)
    else setAdviser(null)
  }, [data, setGradeLevel])

  const contextPayload = useMemo(() => {
    return {
      sectionId,
      gradeLevel,
      schoolYearId
    }
  }, [sectionId, gradeLevel, schoolYearId])

  return (
    <DashboardTemplate>
      <SectionContext.Provider value={contextPayload}>
        <h3 className='pb-3'>
          Section <SubTitle>{title}</SubTitle>
        </h3>
        <StyledRow>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={{ span: 4 }}>
                    <SelectSchoolYears label={''} {...formInstant} />
                  </Col>
                </Row>

                <Row>
                  <Col xs={{ span: 2 }}>
                    <ItemTitle>Adviser</ItemTitle>
                  </Col>
                  <Col xs={{ span: 4 }}>{adviser || <AddSectionAdviser />}</Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </StyledRow>
        <SectionSubjects />
        <SectionStudents />
      </SectionContext.Provider>
    </DashboardTemplate>
  )
}
