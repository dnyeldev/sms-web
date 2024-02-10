import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Modal, ListGroup, Col, Row, Button, Form } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import styledComponents from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  CalendarSyncMutation,
  getCalendarLastSyncDateQuery,
  getOAuthTokenQuery,
  getOAuthUrlQuery,
  getSessionsQuery,
  verifyOauthTokenMutation
} from './gql'
import { LoginContext } from '../../pages/login'
import CalendarFilterContext from './calendarFilter.context'
import CancelBooking from './cancelBooking'
import CancelBookingContext from './cancelBooking.context'
import { LoadingSpinner } from '../../components'
import RegistryClient from '../../RegistryClient'
import { Controller, useForm } from 'react-hook-form'
import ls from 'local-storage'

moment.locale('en')
const localizer = momentLocalizer(moment)

const CalendarContext = createContext()

const { Check } = Form

const Label = styledComponents.span`
  font-size: 16px;
  color: #fe9445;
`

const Content = styledComponents.span`
  font-size: 14px;
  color: #757575;
`

export default function Index() {
  const { state } = useLocation()
  const [events, setEvents] = useState([])
  const [view, setView] = useState('month')
  const { instanceUid, roleCode } = useContext(LoginContext)
  const [sessions, setSessions] = useState([])
  const [event, setEvent] = useState(null)
  const { selectList, setSelectList, searchUid } = useContext(
    CalendarFilterContext
  )
  const [language] = useState('en')

  const { data: getSessionsResult } = useQuery(getSessionsQuery, {
    variables: { instanceUid, roleCode, searchUid },
    pollInterval: 5000
  })

  useEffect(() => {
    if (state) {
      const iSessionUid = _.has(state, 'sessionUid') ? state.sessionUid : null
      const session = _.find(sessions, { uid: iSessionUid })

      const id = _.has(session, 'id') ? session.id : null
      const interest = _.has(session, 'interest') ? session.interest : null
      const startDate = _.has(session, 'startDate') ? session.startDate : null
      const endDate = _.has(session, 'endDate') ? session.endDate : null
      const timeslot = _.has(session, 'timeslot') ? session.timeslot : null
      const enrollees = _.has(session, 'enrollees') ? session.enrollees : []
      const tutorialProfile = _.has(timeslot, 'tutorialProfile')
        ? timeslot.tutorialProfile
        : null
      const sessionType = _.has(tutorialProfile, 'sessionType')
        ? tutorialProfile.sessionType
        : null
      const price = _.has(tutorialProfile, 'price')
        ? tutorialProfile.price
        : null
      const iStatus = _.has(session, 'status') ? session.status : null
      const tutor = _.has(tutorialProfile, 'tutor')
        ? tutorialProfile.tutor
        : null
      const tutorUid = _.has(tutor, 'uid') ? tutor.uid : null
      const others = _.has(tutor, 'others') ? tutor.others : null
      const tutorFirstName = _.has(others, 'firstName')
        ? others.firstName
        : null
      const tutorLastName = _.has(others, 'lastName') ? others.lastName : null
      const tutorFullName = `${_.startCase(
        _.toLower(tutorFirstName)
      )} ${_.startCase(_.toLower(tutorLastName))}`
      const canResched = _.has(session, 'canResched')
        ? session.canResched
        : null
      const canCancel = _.has(session, 'canCancel') ? session.canCancel : null

      const iEvent = {
        id,
        title: interest,
        start: new Date(startDate),
        end: new Date(endDate),
        sessionType,
        price,
        status: iStatus,
        tutorUid,
        tutor: tutorFullName,
        enrollees,
        sessionUid: iSessionUid,
        canResched,
        canCancel
      }

      setEvent(iEvent)
    }
  }, [state, sessions])

  useEffect(() => {
    const rows = _.has(getSessionsResult, 'getAllUserSessions')
      ? getSessionsResult.getAllUserSessions
      : []

    setSessions(rows)
  }, [getSessionsResult])

  useEffect(() => {
    const eventRows = _.map(sessions, (session) => {
      const id = _.has(session, 'id') ? session.id : null
      const sessionUid = _.has(session, 'uid') ? session.uid : null
      const interest = _.has(session, 'interest') ? session.interest : null
      const startDate = _.has(session, 'startDate') ? session.startDate : null
      const endDate = _.has(session, 'endDate') ? session.endDate : null
      const timeslot = _.has(session, 'timeslot') ? session.timeslot : null
      const enrollees = _.has(session, 'enrollees') ? session.enrollees : []
      const tutorialProfile = _.has(timeslot, 'tutorialProfile')
        ? timeslot.tutorialProfile
        : null
      const sessionType = _.has(tutorialProfile, 'sessionType')
        ? tutorialProfile.sessionType
        : null
      const price = _.has(tutorialProfile, 'price')
        ? tutorialProfile.price
        : null
      const iStatus = _.has(session, 'status') ? session.status : null
      const tutor = _.has(tutorialProfile, 'tutor')
        ? tutorialProfile.tutor
        : null
      const tutorUid = _.has(tutor, 'uid') ? tutor.uid : null
      const others = _.has(tutor, 'others') ? tutor.others : null
      const tutorFirstName = _.has(others, 'firstName')
        ? others.firstName
        : null
      const tutorLastName = _.has(others, 'lastName') ? others.lastName : null
      const tutorFullName = `${_.startCase(
        _.toLower(tutorFirstName)
      )} ${_.startCase(_.toLower(tutorLastName))}`
      const canResched = _.has(session, 'canResched')
        ? session.canResched
        : null
      const canCancel = _.has(session, 'canCancel') ? session.canCancel : null

      return {
        id,
        title: interest,
        start: new Date(startDate),
        end: new Date(endDate),
        sessionType,
        price,
        status: iStatus,
        tutorUid,
        tutor: tutorFullName,
        enrollees,
        sessionUid,
        canResched,
        canCancel
      }
    })

    setEvents(eventRows)
  }, [sessions, roleCode])

  useEffect(() => {
    if (roleCode === 'TUTEE') {
      _.map(events, (row) => {
        const tutorUid = _.has(row, 'tutorUid') ? row.tutorUid : null
        const tutor = _.has(row, 'tutor') ? row.tutor : null
        const exists = _.find(selectList, { uid: tutorUid })

        if (!exists) {
          const newList = [...selectList, { uid: tutorUid, value: tutor }]
          setSelectList(newList)
        }
      })
    } else if (roleCode === 'TUTOR') {
      _.map(events, (row) => {
        const enrollees = _.has(row, 'enrollees') ? row.enrollees : []

        _.map(enrollees, (enrollee) => {
          const tutee = _.has(enrollee, 'tutee') ? enrollee.tutee : null
          const tuteeUid = _.has(tutee, 'uid') ? tutee.uid : null
          const others = _.has(tutee, 'others') ? tutee.others : null
          const firstName = _.has(others, 'firstName')
            ? _.startCase(_.toUpper(others.firstName))
            : null
          const lastName = _.has(others, 'lastName')
            ? _.startCase(_.toUpper(others.lastName))
            : null
          const student = `${firstName} ${lastName}`
          const exists = _.find(selectList, { uid: tuteeUid })

          if (!exists) {
            const newList = [...selectList, { uid: tuteeUid, value: student }]
            setSelectList(newList)
          }
        })
      })
    }
  }, [events, selectList])

  const handleSelectEvent = useCallback((row) => {
    setEvent(row)
  }, [])

  // handle calendar change of view e.g. monthly, weekly, etc.
  const onView = useCallback((e) => {
    setView(e)
  })

  const contextPayload = useMemo(
    () => ({
      event,
      setEvent
    }),
    [event, setEvent]
  )

  const lang = {
    en: {
      previous: 'Prev',
      next: 'Next',
      today: 'Cur'
    }
  }

  return (
    <CalendarContext.Provider value={contextPayload}>
      <Row gutter={[16, 32]}>
        {roleCode === 'TUTOR' && (
          <Col xs={{ span: 12 }} className='mb-1'>
            <CalendarSync />
          </Col>
        )}
        <Col xs={{ span: 12 }}>
          <Calendar
            culture={language}
            messages={lang[language]}
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500 }}
            view={view}
            step={30}
            selectable={false}
            onSelectEvent={handleSelectEvent}
            onView={onView}
          />
        </Col>
      </Row>

      <ViewEventModal />
    </CalendarContext.Provider>
  )
}

function ViewEventModal() {
  const { event, setEvent } = useContext(CalendarContext)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState(null)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [tutor, setTutor] = useState(null)
  const [status, setStatus] = useState(null)
  const [sessionType, setSessionType] = useState(null)
  const [sessionUid, setSessionUid] = useState(null)
  const navigate = useNavigate()
  const [canResched, setCanResched] = useState(false)
  const [canCancel, setCanCancel] = useState(false)

  const onClose = () => {
    window.history.replaceState({}, document.title)
    setEvent(null)
  }

  useEffect(() => {
    if (event) {
      const iTitle = _.has(event, 'title') ? event.title : null
      const iStart = _.has(event, 'start')
        ? moment(event.start).format('lll')
        : null
      const iEnd = _.has(event, 'end') ? moment(event.end).format('lll') : null
      const iStatus = _.has(event, 'status') ? event.status : null
      const iTutor = _.has(event, 'tutor') ? event.tutor : null
      const type = _.has(event, 'sessionType') ? event.sessionType : null
      const iSessionUid = _.has(event, 'sessionUid') ? event.sessionUid : null
      const iCanResched = _.has(event, 'canResched') ? event.canResched : null
      const iCanCancel = _.has(event, 'canCancel') ? event.canCancel : null

      setTitle(iTitle)
      setStart(iStart)
      setEnd(iEnd)
      setStatus(iStatus)
      setVisible(true)
      setTutor(iTutor)
      setSessionType(type)
      setSessionUid(iSessionUid)
      setCanResched(iCanResched)
      setCanCancel(iCanCancel)
    } else {
      setVisible(false)
    }
  }, [event])

  const onReschedule = useCallback(() => {
    navigate('/booking/reschedule', { state: { sessionUid } })
  }, [sessionUid])

  const cancelPayload = useMemo(
    () => ({
      title,
      sessionUid,
      setEvent
    }),
    [title, sessionUid, setEvent]
  )

  return (
    <Modal show={visible} keyboard={false} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={solid('user-graduate')} /> {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <Label>
                  <FontAwesomeIcon icon={solid('clock')} /> Scheduled
                </Label>
              </Col>
              <Col lg={8}>
                <Content>
                  {' '}
                  {start} - {end}
                </Content>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <Label>
                  <FontAwesomeIcon icon={solid('user-gear')} /> Session Type
                </Label>
              </Col>
              <Col lg={8}>
                <Content>{sessionType}</Content>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <Label>
                  <FontAwesomeIcon icon={solid('bookmark')} /> Status
                </Label>
              </Col>
              <Col lg={8}>
                <Content>{status}</Content>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col lg={4}>
                <Label>
                  <FontAwesomeIcon icon={solid('chalkboard-user')} /> Tutor
                </Label>
              </Col>
              <Col lg={8}>
                <Content>{tutor}</Content>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='link' onClick={onClose}>
          <FontAwesomeIcon icon={solid('xmark')} /> Cancel
        </Button>

        {canResched && (
          <Button variant='link' onClick={onReschedule}>
            <FontAwesomeIcon icon={solid('calendar-day')} /> Reschedule
          </Button>
        )}

        {canCancel && (
          <CancelBookingContext.Provider value={cancelPayload}>
            <CancelBooking />
          </CancelBookingContext.Provider>
        )}
      </Modal.Footer>
    </Modal>
  )
}

const CalendarSync = () => {
  const { userUid } = useContext(LoginContext)
  const [lastSyncDate, setLastSyncDate] = useState(null)
  const [params] = useSearchParams()
  const [token, setToken] = useState(null)
  const [canSync, setCanSync] = useState(ls.get('allowGoogleSync') || false)
  const navigate = useNavigate()
  const code = params.get('code')
  const [loading, setLoading] = useState(false)
  const formInstant = useForm({
    defaultValues: {
      allowGoogleSync: canSync
    }
  })

  const { control, watch } = formInstant
  const watchAllowSync = watch('allowGoogleSync')

  const [verifyToken] = useMutation(verifyOauthTokenMutation, {
    client: RegistryClient
  })

  const [getToken] = useLazyQuery(getOAuthTokenQuery, {
    client: RegistryClient
  })

  const [sync] = useMutation(CalendarSyncMutation, {
    update(cache, { data }) {
      const { syncCalendar } = data
      const id = _.has(syncCalendar, 'id') ? syncCalendar.id : null
      const updatedAt = _.has(syncCalendar, 'updatedAt')
        ? syncCalendar.updatedAt
        : null

      cache.modify({
        id: `CalendarLastSyncDate:${id}`,
        fields: { updatedAt }
      })
    }
  })

  const { data: lastSyncData } = useQuery(getCalendarLastSyncDateQuery, {
    skip: !userUid,
    variables: { userUid }
  })

  const [generateUrl] = useLazyQuery(getOAuthUrlQuery, {
    client: RegistryClient
  })

  useEffect(() => {
    async function doProcess() {
      setLoading(true)

      // verify token first
      const validateResult = await verifyToken({ variables: { userUid } })
      const validateData = _.has(validateResult, 'data')
        ? validateResult.data
        : null
      const validToken = _.has(validateData, 'verifyOauthToken')
        ? validateData.verifyOauthToken
        : null

      if (!validToken && !code) {
        // if not valid token & no code has been passed, reauthenticate oauth
        // get generate oauth token url
        await generateUrl().then((result) => {
          const data = _.has(result, 'data') ? result.data : null
          let url = _.has(data, 'getOAuthUrl') ? data.getOAuthUrl : null

          window.location.href = url
        })
      } else if (code) {
        // if oauth code has been passed, generate new token by passing oauthCode
        await getToken({ variables: { userUid, oauthCode: code } }).then(
          (result) => {
            const data = _.has(result, 'data') ? result.data : null
            const account = _.has(data, 'getOAuthToken')
              ? data.getOAuthToken
              : null
            const iToken = _.has(account, 'token') ? account.token : null

            return iToken
          }
        )

        navigate('/tutor/calendar')
      } else {
        // get token existing token without passing oauthCode
        const tokenResult = await getToken({ variables: { userUid } })
        const tokenData = _.has(tokenResult, 'data') ? tokenResult.data : null

        // validate token
        const oauthToken = _.has(tokenData, 'getOAuthToken')
          ? tokenData.getOAuthToken
          : null
        let iToken = _.has(oauthToken, 'token') ? oauthToken.token : null

        setToken(iToken)
      }

      // setToken(token)
      setLoading(false)
    }

    if (canSync) doProcess()
  }, [params, code, canSync])

  useEffect(() => {
    const calendar = _.has(lastSyncData, 'getCalendarLastSyncDate')
      ? lastSyncData.getCalendarLastSyncDate
      : null
    const updatedAt = _.has(calendar, 'updatedAt')
      ? moment(calendar.updatedAt).format('lll')
      : null

    setLastSyncDate(updatedAt)
  }, [lastSyncData])

  useEffect(() => {
    const allow = watchAllowSync ? true : false

    ls.set('allowGoogleSync', allow)
    setCanSync(allow)
  }, [watchAllowSync])

  const syncNow = useCallback(() => {
    async function doProcess() {
      setLoading(true)

      await sync({ variables: { userUid, token } }).finally(() => {
        setLoading(false)
      })
    }

    if (canSync && userUid && token) doProcess()
    else setCanSync(true)
  }, [canSync, userUid, token])

  return (
    <>
      <Form noValidate>
        <Controller
          name='allowGoogleSync'
          control={control}
          render={({ field }) => {
            let checked = _.has(field, 'value') ? field.value : null

            return (
              <Check
                type='switch'
                label='Allow Google Calendar Sync'
                checked={checked}
                {...field}
              />
            )
          }}
        />
      </Form>
      <Button onClick={syncNow} variant='secondary' disabled={!canSync}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FontAwesomeIcon icon={solid('rotate')} /> Sync to Google Calendar
            Now
          </>
        )}
      </Button>
      <p>
        Last Sync Date:{' '}
        <span>{loading ? <LoadingSpinner /> : lastSyncDate}</span>
      </p>
    </>
  )
}
