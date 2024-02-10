import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { DashboardTemplate } from '../../../template/components'
import SubjectsContext from './subjects.context'
import { Card, Row, Col } from 'react-bootstrap'
import styledComponents from 'styled-components'
import AppContext from '../../app/app.context'
import SubjectsTable from './subjectsTable'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const { schoolYearId, sectionId } = useContext(AppContext)
  const [sectionSubjectId, setSectionSubjectId] = useState(null)

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
      <SubjectsContext.Provider value={contextPayload}>
        <StyledRow>
          <Col>
            <Card>
              <Card.Header>
                <h3 className='pb-3'>Grades</h3>
              </Card.Header>
              <Card.Body>
                <SubjectsTable />
              </Card.Body>
            </Card>
          </Col>
        </StyledRow>
      </SubjectsContext.Provider>
    </DashboardTemplate>
  )
}
