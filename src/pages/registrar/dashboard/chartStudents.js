import { Card, Col, Row } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { GET_USERS } from './gql'
import _ from 'lodash'
import { LoadingSpinner } from '../../../components'
import { useQuery } from '@apollo/client'

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export default function chartStudents() {
  const [male, setMale] = useState(0)
  const [female, setFemale] = useState(0)

  const { data, loading } = useQuery(GET_USERS, {
    variables: { roleCodes: ['STUDENT'], status: 'ACTIVE' }
  })

  useEffect(() => {
    const records = _.has(data, 'getAllUsers') ? data.getAllUsers : []

    const iMale = _.filter(records, (i) => i.profile.gender === 'MALE')
    const iFemale = _.filter(records, (i) => i.profile.gender === 'FEMALE')

    setMale(iMale.length)
    setFemale(iFemale.length)
  }, [data])

  const barData = {
    labels: ['Student'],
    datasets: [
      {
        label: 'Male',
        data: [male],
        backgroundColor: 'aqua'
      },
      {
        label: 'Female',
        data: [female],
        backgroundColor: 'pink'
      }
    ]
  }
  const options = {}

  return (
    <Card>
      <Card.Header>
        <h3>Students:</h3>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col lg={6}>
            <p className='text-center m-2'> Male:</p>
          </Col>
          <Col lg={6}>
            <p className='text-center m-2'> Female:</p>
          </Col>
          <Col lg={12}>
            <Bar data={barData} options={options}></Bar>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
