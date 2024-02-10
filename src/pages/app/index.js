import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Outlet } from 'react-router-dom'
import _ from 'lodash'
import { useIdleTimer } from 'react-idle-timer'

import LoginContext from '../login/login.context'
import Header from './header'
import Footer from './footer'
import NAVS from '../../constants/navigation'
import AppContext from './app.context'
import { useLazyQuery } from '@apollo/client'
import { getUserEnrollment } from './gql'

export default function Index() {
  const { userId, logout } = useContext(LoginContext)
  const [schoolYearId, setSchoolYearId] = useState(null)
  const [enrollmentId, setEnrollmentId] = useState(null)
  const [gradeLevel, setGradeLevel] = useState(null)
  const [sectionId, setSectionId] = useState(null)

  const onIdle = () => {
    if (userId) {
      logout()
    }
  }

  useIdleTimer({
    onIdle,
    timeout: 1000 * 60 * 60 // @NOTE autologout if inactive for 1 hour
    // timeout: 1000 * 10, //@NOTE autologout if inactive for 10 seconds for testing only
  })

  const [getEnrollee] = useLazyQuery(getUserEnrollment)

  useEffect(() => {
    if (userId && schoolYearId) {
      getEnrollee({ variables: { userId, schoolYearId } }).then((result) => {
        const data = _.has(result, 'data') ? result.data : null
        const enrollment = _.has(data, 'getUserEnrollment')
          ? data.getUserEnrollment
          : null
        const iEnrollmentId = _.has(enrollment, 'id')
          ? parseInt(enrollment.id)
          : null
        const iGradeLevel = _.has(enrollment, 'gradeLevel')
          ? enrollment.gradeLevel
          : null
        const section = _.has(enrollment, 'section') ? enrollment.section : null
        const iSectionId = _.has(section, 'id') ? parseInt(section.id) : null

        setEnrollmentId(iEnrollmentId)
        setGradeLevel(iGradeLevel)
        setSectionId(iSectionId)
      })
    }
  }, [userId, schoolYearId])

  const contextPayload = useMemo(
    () => ({
      schoolYearId,
      setSchoolYearId,
      enrollmentId,
      gradeLevel,
      sectionId
    }),
    [schoolYearId, setSchoolYearId, enrollmentId, gradeLevel, sectionId]
  )

  return (
    <AppContext.Provider value={contextPayload}>
      <div className='main-wrapper'>
        <HeaderNavigation />
        <Outlet />
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

function HeaderNavigation() {
  const { roleCode = 'DEFAULT', userId, logout } = useContext(LoginContext)
  const { navigation } = NAVS
  const found = _.find(navigation, { roleCode })
  const links = _.has(found, 'links') ? found.links : []
  const [authenticated, setAuthenticated] = useState(true)

  useEffect(() => {
    if (userId) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [userId])

  const onLogout = useCallback(() => {
    logout()
    setAuthenticated(false)
  })

  return (
    <Header navs={links} onLogout={onLogout} authenticated={authenticated} />
  )
}
