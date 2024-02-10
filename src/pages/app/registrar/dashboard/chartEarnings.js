import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function chartEarnings() {

    const lineData = {
        labels: ['January', 'Febraudry', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
        datasets: [{
          label:'Monthly',
          data:[20,30,20,10,15,40,55,53,33,12,23],
          borderColor:'aqua',
          tension:0.4
        }]
       }
       const options ={

       }
  return (
    <Card>
        <Card.Header>
            <h3>Earning Graph</h3>
            </Card.Header>
        <Card.Body>
            <Row>
            <Col lg={4}><p className='text-center m-2'> Total Earnings</p></Col>
            <Col lg={4}><p className='text-center m-2'> Line Graph</p></Col>
            <Col lg={4}><p className='text-center m-2'> Line Graph</p></Col>
            <Col lg={12}>
                <Line 
                data={lineData}
                options={options}>
                </Line>
            </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}

