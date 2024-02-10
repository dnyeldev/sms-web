import React from 'react';
import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import LiveSessionCard from './liveSessionCard';
import UpcomingSessionCards from './upcomingSessionCard';
import AttendanceWidget from '../../attendance/attendanceWidget';
import RecommendedTutors from './recommendedTutors'
import { DashboardTemplate } from '../../../template/components';
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Announcement from './announcement';


ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);




export default function Index( ) {

  const localizer = momentLocalizer(moment);


  const bgDate = {
    width:'110px'
 }

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

 const events = [
  {
    title: 'Event 1',
    start: new Date(2024, 0, 26, 10, 0),
    end: new Date(2024, 0, 26, 12, 0),
  },
  // Add more events as needed
];

  return (

      <Row>
        <Col>
          <Announcement/>
              </Col>
      </Row>
  );
}
