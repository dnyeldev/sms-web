/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { getLearningPathsMutation } from './gql';
import { Button } from 'react-bootstrap';

const imgSrc = [
  '/assets/img/course/course-01.jpg',
  '/assets/img/course/course-02.jpg',
  '/assets/img/course/course-03.jpg',
  '/assets/img/course/course-04.jpg',
  '/assets/img/course/course-05.jpg',
  '/assets/img/course/course-06.jpg',
  '/assets/img/course/course-07.jpg',
  '/assets/img/course/course-08.jpg',
];

export default function Index() {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);

  const redirect = useCallback(() => {
    navigate('/search');
  });

  const { data: queryInterests } = useQuery(getLearningPathsMutation);

  useEffect(() => {
    const learningPaths = _.has(queryInterests, 'getLearningPaths') ? queryInterests.getLearningPaths : [];

    const parsed = _.map(learningPaths, (item, key) => ({
      courseImage: imgSrc[key],
      ...item,
    }));

    setInterests(parsed);
  }, [queryInterests]);

  return (
    <div className="course-sec">
      <div className="container">
        <div className="row">
          {interests.map((interest) => <InterestItem {...interest} />)}
        </div>
        <div className="view-all text-center">
          {/* <a href="#" onClick={redirect} className="btn btn-primary btn-view">View All</a> */}
          <Button variant='link' onClick={redirect}>View All</Button>
        </div>
      </div>
    </div>
  );
}

function InterestItem(payload) {
  const navigate = useNavigate();
  const [courseImage, setCourseImage] = useState(null);
  const [interest, setInterest] = useState(null);
  const [tutorsTotal, setTutorsTotal] = useState(null);

  useEffect(() => {
    const iCourseImage = _.has(payload, 'courseImage') ? payload.courseImage : null;
    const iInterest = _.has(payload, 'title') ? payload.title : null;
    const tutorsCount = _.has(payload, 'tutorsCount') ? payload.tutorsCount : null;

    setCourseImage(iCourseImage);
    setInterest(iInterest);
    setTutorsTotal(tutorsCount);
  }, [payload]);

  const redirect = useCallback(() => {
    navigate('/search', {
      state: {
        search: interest,
      },
    });
  }, [interest]);

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="course-item">
        {/* <a href="#" onClick={redirect} className="course-img">
          <div className="image-col-merge">
            <img src={courseImage} alt="learn" />
            <div className="course-text">
              <h5>{interest}</h5>
              <div className="d-flex justify-content-between">
                <p>
                  {tutorsTotal}
                  {' '}
                  Tutors
                </p>
              </div>
            </div>
          </div>
        </a> */}
        <Button variant='link' onClick={redirect} className="course-img">
          <div className="image-col-merge">
            <img src={courseImage} alt="learn" />
            <div className="course-text">
              <h5>{interest}</h5>
              <div className="d-flex justify-content-between">
                <p>
                  {tutorsTotal}
                  {' '}
                  Tutors
                </p>
              </div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}
