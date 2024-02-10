/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import _ from 'lodash';
import Promise from 'bluebird';
// import styledComponents from 'styled-components';
import { CustomPlaceHolder, ImageViewer, Ratings } from '../../components';
import { elasticSearchQuery, getUserQuery } from './gql';
// import RegistryClient from '../../RegistryClient';

const SliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

export default function Index() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false)

  const { data: querySearch, loading: loadingElastic } = useQuery(elasticSearchQuery, {
    variables: {
      type: 'TUTOR',
      offset: 0,
    },
  });
  // const [getUser] = useLazyQuery(getUserQuery, { client: RegistryClient });

  useEffect(() => {
    setLoading(loadingElastic)
  }, [setLoading, loadingElastic])

  useEffect(() => {
    async function doProcess() {
      setLoading(true)
      const searchResult = _.has(querySearch, 'elasticSearch') ? querySearch.elasticSearch : null;
      const rows = _.has(searchResult, 'rows') ? searchResult.rows : [];
      const items = [];

      await Promise.map(rows, async (row) => {
        const userUid = _.has(row, 'referenceUid') ? row.referenceUid : null;
        const doc = _.has(row, 'document') ? row.document : null;
        const minPrice = _.has(doc, 'minPrice') ? doc.minPrice : null;
        const rating = _.has(doc, 'rating') ? doc.rating : null;
        const firstName = _.has(doc, 'firstName') ? _.toUpper(doc.firstName) : null;
        const lastName = _.has(doc, 'lastName') ? _.toUpper(doc.lastName) : null;
        const fullName = `${firstName} ${lastName}`;
        const location = _.has(doc, 'location') ? doc.location : null;
        const interests = _.has(doc, 'interests') ? doc.interests : [];
        const interest = interests.length ? interests[0].interest : null;

        // const user = await getUser({ variables: { uid: userUid } })
        //   .then((result) => {
        //     const data = _.has(result, 'data') ? result.data : null;
        //     const iUser = _.has(data, 'getUser') ? data.getUser : null;

        //     return iUser;
        //   })
        //   .catch((err) => { throw new Error(err); });

        const user = null

        const iAvatar = _.has(user, 'avatar') ? user.avatar : null;
        const iStorage = _.has(iAvatar, 'storage') ? iAvatar.storage : null;
        const path = _.has(iStorage, 'path') ? iStorage.path : null;

        const parsed = {
          userUid,
          profileImage: path,
          fullName,
          location,
          interest: interest && _.startCase(interest),
          priceRange: minPrice,
          rating,
        };

        if (firstName) { items.push(parsed); }
      });

      if (items.length < 4) {
        setTutors([...items, ...items]);
      } else {
        setTutors(items);
      }

      setLoading(false)
    }

    doProcess();
  }, [querySearch]);

  return (
    <CustomPlaceHolder rowSet={2} loading={loading}>
      <div className="mendor-list" style={{ overflowX: 'auto', minWidth: '1200px' }}>
        <div className="container">
          {tutors.length > 0 && (<LoadSlider tutors={tutors} />)}
        </div>
      </div>
    </CustomPlaceHolder>
  );
}

function LoadSlider(payload) {
  const { tutors = [] } = payload;

  return (
    <Slider className="mendor-slider slick" {...SliderSettings}>
      {tutors.map((tutor) => <MentorItem {...tutor} />)}
    </Slider>
  );
}

// const StyledImg = styledComponents.img`
//   width: 80% !important;
//   border-radius: 4px 4px 0 0;
// `;

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
          <ImageViewer
            filePath={profileImage}
            thumbnail
            fluid
          />
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
