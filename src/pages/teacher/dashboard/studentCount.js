import React from 'react'
import { Col, Row, ListGroup, Card } from 'react-bootstrap';

export default function studentCount() {
  return (
    <Col >
        <Card>
          <Card.Body>
            <Row>
            <ListGroup as='ul'>
                  <ListGroup.Item
                    as='li'
                    className='d-flex justify-content-between align-items-start'
                  >
                    <div className='ms-2 me-auto'>
                      <h3 className='fw-bold'>Students:</h3>
                      <h4>COUNT</h4>
                    </div>
                  </ListGroup.Item>
              </ListGroup>
          </Row>
          </Card.Body>
        </Card>
    </Col>
  )
}

