import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';
import LoginContext from '../login/login.context';
const CUSTOMERCARE = process.env.REACT_APP_CUSTOMERCARE;
const VIBAL_CONTACT = process.env.REACT_APP_CONTACT;

const EmailLink = styledComponents.a`
  color: #FFFFFF;
  &:hover {
    color: #fe9445;
  }
`;

export default function Index() {
  const { userUid, roleCode } = useContext(LoginContext);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-4">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <img src="/assets/img/logo.png" alt="logo" />
                  <br />
                  Cedar Hills Christian Academy Foundation Inc.
                </div>
                <div className="footer-about-content">
                  <p>
                    Teaching is training. Training of life must include training for eternity. CHCAFI is an extension od the Christian home in training children in a Christian environment for time and eternity. The school staff  works closely with parents to train the child wholistically
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Terms & Policy</h2>
                <ul>
                  <li><Link to="/terms-of-services">Terms of Service </Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Contact Us</h2>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <p>Cedar Hills Christian Academy Foundation Inc.</p>
                    <p>
                      Lot 18 Block 28, Saranay Homes, Bagumbong, Caloocan
                    </p>
                    <p>Philippines</p>
                  </div>
                  <p>{VIBAL_CONTACT}</p>

                  <div className="footer-widget footer-menu">
                    <ul>
                      <li>
                        (02) 3456 0961
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-fluid">

          <div className="copyright">
            <div className="row">
              <div className="col-md-6">
                <div className="copyright-text">
                  <p className="mb-0">&copy; 2023 Cedar Hills Christian Academy Foundation Inc. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div >

        </div >
      </div >
    </footer >
  );
}
