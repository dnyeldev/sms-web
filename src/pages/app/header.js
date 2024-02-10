import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import _ from 'lodash'
import { Button, Dropdown } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { arrayOf, bool, func } from 'prop-types'
import styledComponents from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { AvatarSmall } from '../../components'
import LoginContext from '../login/login.context'
import { useForm } from 'react-hook-form'
import SelectEnrollmentSY from '../../components/SelectEnrollmentSY'
import AppContext from './app.context'
// import { getUserQuery } from './gql';
// import RegistryClient from '../../RegistryClient';
// import { NotificationBadge } from '../notification';

export default function Index(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeNav, setActiveNav] = useState(0)
  const [activeSubNav, setActiveSubNav] = useState(0)
  const { navs, onLogout, authenticated } = props
  const { userUid, roleCode } = useContext(LoginContext)
  const pathname = _.has(location, 'pathname') ? location.pathname : null
  const [firstName, setFirstName] = useState(null)
  const [middleInitial, setMiddleInitial] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [initials, setInitials] = useState(null)
  const [canEditProfile, setCanEditProfile] = useState(true)
  const [roleName, setRoleName] = useState(null)
  const { setSchoolYearId } = useContext(AppContext)

  const UserDropdown = styledComponents.div`
    display: none!important; 
    
    @media (min-width: 576px) {
      display: flex !important;
    }
  `

  const MobileOnly = styledComponents.li`
    @media (min-width: 576px) {
      display: none!important; 
    }
  `

  const StyledButtonNav = styledComponents(Button)`
    padding: unset;
    font-size: inherit;
    margin: unset;
    line-height: unset;
    text-align: unset;
    vertical-align: unset;
    border: unset;
    border-radius: unset;
  `

  // const { data: userResult } = useQuery(getUserQuery, {
  //   skip: !userUid,
  //   client: RegistryClient,
  //   variables: { uid: userUid },
  // });

  const userResult = null

  const formInstant = useForm()
  const { watch } = formInstant

  const wSchoolYearId = watch('schoolYearId')
  useEffect(() => {
    // set header active school year id
    setSchoolYearId(
      wSchoolYearId && !_.isNaN(wSchoolYearId) ? parseInt(wSchoolYearId) : null
    )
  }, [wSchoolYearId])

  useEffect(() => {
    const user = _.has(userResult, 'getUser') ? userResult.getUser : null
    const profile = _.has(user, 'userProfile') ? user.userProfile : null
    const iFirstName = _.has(profile, 'firstName') ? profile.firstName : null
    const iMI = _.has(profile, 'middleInitial') ? profile.middleInitial : null
    const iLastName = _.has(profile, 'lastName') ? profile.lastName : null
    const iInitials =
      iFirstName && iLastName
        ? `${_.toUpper(iFirstName.charAt(0))}${_.toUpper(iLastName.charAt(0))}`
        : ''

    setFirstName(iFirstName)
    setMiddleInitial(iMI)
    setLastName(iLastName)
    setInitials(iInitials)

    switch (roleCode) {
      case 'SCHOOL_ADMIN':
        setRoleName('SCHOOL ADMIN')
        break
      case 'SYSTEM_ADMIN':
        setRoleName('SYSTEM ADMIN')
        break
      default:
        setRoleName(roleCode)
    }

    if (roleCode !== 'STUDENT') {
      setCanEditProfile(false)
    } else {
      setCanEditProfile(true)
    }
  }, [userResult, roleCode])

  const onNavigate = ({ navKey, subKey, path }) => {
    if (navKey !== undefined) {
      setActiveNav(navKey)
    }

    if (subKey !== undefined) {
      setActiveSubNav(subKey)
    }

    navigate(path)
  }

  const toProfileSettings = useCallback(() => {
    // switch (roleCode) {
    //   case 'TUTOR': navigate('/tutor/profile-settings')
    //     break;
    //   default: navigate('/student/profile-settings')
    // }
    navigate('/profile')
  }, [roleCode])

  const toProfile = useCallback(() => {
    switch (roleCode) {
      case 'TUTOR':
        navigate('/tutor/my-profile')
        break
      case 'MARKETING_ADMIN':
        navigate('/marketing-admin/my-profile')
        break
      case 'SUPERADMIN':
        navigate('/superadmin/my-profile')
        break
      case 'PARTNER_MERCHANT':
        navigate('/partner-merchant/my-profile')
        break
      case 'SUPPORT':
        navigate('/support/my-profile')
        break
      default:
        navigate('/student/my-profile')
    }
  }, [roleCode])

  useEffect(() => {
    const paths = _.split(pathname, '/')
    const mainPath = `/${paths[1]}`

    const mainKeyString = _.findKey(navs, { path: mainPath })
    const mainKey = mainKeyString && parseInt(mainKeyString)

    setActiveNav(mainKey || 1)
  }, [pathname])

  return (
    <header className={`header ${pathname === '/' && 'min-header'}`}>
      <nav className='navbar navbar-expand-lg header-nav'>
        <div className='navbar-header'>
          <StyledButtonNav id='mobile_btn' variant='link'>
            <span className='bar-icon'>
              <span />
              <span />
              <span />
            </span>
          </StyledButtonNav>
          <StyledButtonNav
            className='navbar-brand logo'
            variant='link'
            onClick={() => navigate('/')}
            style={{ width: '3em', marginRight: '16px' }}
          >
            <img
              src='/assets/img/logo.png'
              className='img-fluid'
              alt='Logo'
              style={{ width: '3em' }}
            />
          </StyledButtonNav>
          Cedar Hills Christian Academy Foundation
        </div>

        <div className='main-menu-wrapper'>
          <div className='menu-header'>
            <StyledButtonNav
              className='menu-logo'
              variant='link'
              onClick={() => navigate('/')}
              style={{ width: '2em' }}
            >
              <img
                src='/assets/img/logo.png'
                className='img-fluid'
                alt='Logo'
                style={{ width: '2em' }}
              />
            </StyledButtonNav>
            <StyledButtonNav
              id='menu_close'
              className='menu-close'
              variant='link'
            >
              <i className='fas fa-times' />
            </StyledButtonNav>
          </div>
          <ul className='main-nav'>
            {authenticated &&
              _.map(navs, (nav, mainKey) => {
                const label = _.has(nav, 'label') ? nav.label : null
                const path = _.has(nav, 'path') ? nav.path : null
                const sub = _.has(nav, 'sub') ? nav.sub : []

                if (sub.length) {
                  return (
                    <li
                      key={`has-submenu-${mainKey}`}
                      className={`has-submenu ${
                        mainKey === activeNav ? 'active' : ''
                      }`}
                    >
                      <StyledButtonNav variant='link'>
                        {label} <i className='fas fa-chevron-circle-down' />
                      </StyledButtonNav>
                      <ul className='submenu'>
                        {_.map(sub, (i, sKey) => {
                          const subLabel = _.has(i, 'label') ? i.label : null
                          const subPath = _.has(i, 'path') ? i.path : null
                          const subKey = `${mainKey}-${sKey}`

                          return (
                            <li
                              key={`submenu-${sKey}`}
                              className={`${
                                subKey === activeSubNav ? 'active' : ''
                              }`}
                            >
                              <StyledButtonNav
                                variant='link'
                                onClick={() =>
                                  onNavigate({
                                    path: subPath,
                                    navKey: mainKey,
                                    subKey
                                  })
                                }
                              >
                                {subLabel}
                              </StyledButtonNav>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }

                return (
                  <li
                    key={`main-nav-${mainKey}`}
                    className={`${mainKey === activeNav ? 'active' : ''}`}
                  >
                    <StyledButtonNav
                      variant='link'
                      onClick={() => onNavigate({ path, navKey: mainKey })}
                    >
                      {label}
                    </StyledButtonNav>
                  </li>
                )
              })}
            {authenticated ? (
              <>
                <MobileOnly>{/* <NotificationBadge isMobile /> */}</MobileOnly>
                <MobileOnly>
                  <StyledButtonNav variant='link' onClick={onLogout}>
                    <FontAwesomeIcon icon={solid('right-from-bracket')} />{' '}
                    Logout
                  </StyledButtonNav>
                </MobileOnly>
              </>
            ) : (
              <MobileOnly>
                <a href='/login'>
                  <FontAwesomeIcon icon={solid('right-to-bracket')} /> Login
                </a>
              </MobileOnly>
            )}
          </ul>
        </div>
        {!authenticated ? (
          <ul className='nav header-navbar-rht'>
            <li className='nav-item'>
              <Button
                variant='primary'
                className='btn-login'
                onClick={() => navigate('/register')}
              >
                <i className='fas fa-sign-in-alt' /> Sign up
              </Button>
            </li>
            <li className='nav-item'>
              <Button
                variant='secondary'
                className='btn-login'
                onClick={() => navigate('/login')}
              >
                <i className='fas fa-lock' /> Sign in
              </Button>
            </li>
          </ul>
        ) : (
          <>
            <ul className='nav header-navbar-rht'>
              <li className='nav-item'>
                <SelectEnrollmentSY label='' {...formInstant} />
              </li>
            </ul>
            <UserDropdown className='d-flex'>
              {/* <NotificationBadge /> */}
              <Dropdown>
                <Dropdown.Toggle variant='link' id='dropdown-basic'>
                  <div className='avatar avatar-sm'>
                    <span className='avatar-title rounded-circle border border-white'>
                      <AvatarSmall noClick />
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={toProfileSettings}>
                    <div className='user-header'>
                      <div className='avatar avatar-sm'>
                        <span className='avatar-title rounded-circle'>
                          {initials}
                        </span>
                      </div>
                      <div className='user-text'>
                        <h6>
                          {firstName || ''} {middleInitial || ''}{' '}
                          {lastName || ''}
                        </h6>
                        <p className='text-muted mb-0'>{roleName}</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  {canEditProfile && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={toProfileSettings}>
                        Profile Settings
                      </Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </UserDropdown>
          </>
        )}
      </nav>
    </header>
  )
}
