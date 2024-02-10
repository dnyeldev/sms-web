/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import PopularMentors from './popularMentors'
import Courses from './courses'

export default function Index() {
  const navigate = useNavigate()

  const submitForm = useCallback((data) => {
    navigate('/sea  rch', { state: { ...data } })
  })

  return (
    <>
      <section className='section section-search'>
        <div className='container'>
          <div className='banner-wrapper m-auto text-center'>
            <div className='banner-header'>
              <h1 className='text-white'>
                Cedar Hills Christian Academy Foundation
              </h1>
              <p className='text-white'>
                "And whatsoever ye do, do it heartily, as to the Lord, and not
                unto men."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section how-it-works'>
        <div className='container'>
          <div className='section-header text-center'>
            <span>GET STARTED</span>
            <div className='sec-dots'>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className='row justify-content-center feature-list'>
            <div className='col-12 col-md-4 col-lg-3'>
              <div className='feature-box text-center top-box'>
                <div className='feature-header'>
                  <div className='feature-icon'>
                    <span className='circle bg-green'>
                      <i className='fas fa-sign-in-alt' />
                    </span>
                  </div>
                  <div className='feature-cont'>
                    <div className='feature-text'>Sign up</div>
                  </div>
                </div>
                <p>
                  Register to explore the possibilities of advanced learning.
                </p>
                <span className='text-green'>01</span>
              </div>
            </div>
            <div className='col-12 col-md-4 col-lg-3 offset-lg-1'>
              <div className='feature-box text-center'>
                <div className='feature-header'>
                  <div className='feature-icon'>
                    <span className='circle bg-blue'>
                      <i className='material-icons'>accessibility</i>
                    </span>
                  </div>
                  <div className='feature-cont'>
                    <div className='feature-text'>Sign in</div>
                  </div>
                </div>
                <p>
                  Use the username and password you registered to search for
                  your tutor.
                </p>
                <span className='text-blue'>02</span>
              </div>
            </div>
            <div className='col-12 col-md-4 col-lg-3 offset-lg-1'>
              <div className='feature-box text-center top-box'>
                <div className='feature-header'>
                  <div className='feature-icon'>
                    <span className='circle bg-orange'>
                      <i className='material-icons'>event_seat</i>
                    </span>
                  </div>
                  <div className='feature-cont'>
                    <div className='feature-text'>Start now</div>
                  </div>
                </div>
                <p>Enjoy learning with our experts.</p>
                <span className='text-orange'>03</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section popular-mendors'>
        <div className='mendor-title'>
          <div className='section-header text-center'>
            <div className='container'>
              <span>For Early Enrollees</span>
              <h2 className='text-white'>Free Tuition Fees</h2>
              <p className='sub-title text-white'>
                shall be given to first three (30) enrollees for every level.
                However, full payment of MIscllaneous Fees is required on or
                before May 2.
              </p>
              <div className='sec-dots'>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <PopularMentors />
      </section>

      <section className='section path-section'>
        <div className='section-header text-center'>
          <div className='container'>
            <span>Program</span>
            <h2 className='text-white'>"Tag-A-Friend"</h2>
            <p className='sub-title text-white'>
              Avail the 5% discount on Tuition Fee for every friend endolled in
              any level. However, for 10 friends enrolled, the child shall enjoy
              FREE Tuition Fee.
            </p>
            <div className='sec-dots'>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
