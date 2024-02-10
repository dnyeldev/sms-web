/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ratings } from '../../components';

const sampleTutors = [{
  profileImage: '/assets/img/mendor/mendor-01.jpg',
  fullName: 'Donna Yancey',
  location: 'Paris, France',
  interest: 'Digital Marketer',
  priceRange: 100,
  rating: 4,
}, {
  profileImage: '/assets/img/mendor/mendor-02.jpg',
  fullName: 'James Amen',
  location: 'Paris, France',
  interest: 'UNIX, Calculus, Trigonometry',
  priceRange: 500,
  rating: 4,
}, {
  profileImage: '/assets/img/mendor/mendor-03.jpg',
  fullName: 'Marvin Downey',
  location: 'Paris, France',
  interest: 'ASP.NET,Computer Gaming',
  priceRange: 400,
  rating: 5,
}, {
  profileImage: '/assets/img/mendor/mendor-04.jpg',
  fullName: 'Betty Hairston',
  location: 'Paris, France',
  interest: 'Computer Programming',
  priceRange: 300,
  rating: 3,
}, {
  profileImage: '/assets/img/mendor/mendor-03.jpg',
  fullName: 'Digital Marketer',
  location: 'Paris, France',
  interest: 'Computer Programming',
  priceRange: 400,
  rating: 4,
}];

export default function Index() {
  // const [tutors, setTutors] = useState([]);

  // useEffect(() => {
  //   setTutors(sampleTutors);
  // }, [sampleTutors]);

  return (
    <div className="row">

      <div className="col-12 col-md-6 col-lg-3">
        <div className="profile-list">
          <div className="profile-detail">
            <div className="profile-img">
              <img className="img-fluid" alt="" src="/assets/img/mendor/mendor-01.jpg" />
            </div>
            <div className="profile-content">
              <h4>Donna Yancey</h4>
              <p>UNIX, Calculus, Trigonometry</p>
            </div>
          </div>
          <div className="profile-rating">
            <div className="rating">
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star" />
            </div>
            <div className="price-box">
              $500
              <span>/ hr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="profile-list">
          <div className="profile-detail">
            <div className="profile-img">
              <img className="img-fluid" alt="" src="/assets/img/mendor/mendor-02.jpg" />
            </div>
            <div className="profile-content">
              <h4>Betty Hairston</h4>
              <p>Computer Programming</p>
            </div>
          </div>
          <div className="profile-rating">
            <div className="rating">
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star" />
            </div>
            <div className="price-box">
              $200
              <span>/ hr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="profile-list">
          <div className="profile-detail">
            <div className="profile-img">
              <img className="img-fluid" alt="" src="/assets/img/mendor/mendor-03.jpg" />
            </div>
            <div className="profile-content">
              <h4>Jose Anderson</h4>
              <p>ASP.NET,Computer Gaming</p>
            </div>
          </div>
          <div className="profile-rating">
            <div className="rating">
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star" />
            </div>
            <div className="price-box">
              $300
              <span>/ hr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className="profile-list">
          <div className="profile-detail">
            <div className="profile-img">
              <img className="img-fluid" alt="" src="/assets/img/mendor/mendor-04.jpg" />
            </div>
            <div className="profile-content">
              <h4>James Amen</h4>
              <p>Digital Marketer</p>
            </div>
          </div>
          <div className="profile-rating">
            <div className="rating">
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star filled" />
              <i className="fas fa-star" />
            </div>
            <div className="price-box">
              $400
              <span>/ hr</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function MentorItem(payload) {
  const [userUid, setUserUid] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [fullName, setFullname] = useState(null);
  const [interest, setInterest] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    setUserUid(payload.userUid);
    setProfileImage(payload.profileImage);
    setLocation(payload.location);
    setFullname(payload.fullName);
    setInterest(payload.interest);
    setPriceRange(payload.priceRange);
    setRating(payload.rating);
  }, [payload]);

  return (
    <div className="mendor-box">
      <div className="mendor-img">
        <Link to={`/profile/${userUid}`}>
          <img className="img-fluid" alt="" src={profileImage} />
        </Link>
        <div className="country">
          <i className="fas fa-map-marker-alt" />
          {' '}
          {location}
        </div>
      </div>
      <div className="mendor-content">
        <h3 className="title">
          <Link to={`/profile/${userUid}`}>{fullName}</Link>
        </h3>
        <div className="course">
          {interest}
        </div>
        <div className="price-list">
          <div className="price">
            {priceRange}
            <span>/ session</span>
          </div>
          <div className="rating">
            <Ratings readonly defaultValues={rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
