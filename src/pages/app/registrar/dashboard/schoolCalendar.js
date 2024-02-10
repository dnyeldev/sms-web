import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Card, Col, Row, ListGroup } from 'react-bootstrap';



export default function schoolCalendar() {
    const localizer = momentLocalizer(moment);

    const events = [
        {
          title: 'Event 1',
          start: new Date(2024, 0, 26, 10, 0),
          end: new Date(2024, 0, 26, 12, 0),
        },
        // Add more events as needed
      ];
      

  return (
    <Card>
        <Card.Header>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </Card.Header>
    </Card>
  )
}

