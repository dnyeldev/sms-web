import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import 'react-select-search/style.css'
import _ from 'lodash'
import { Modal, Button, Image, Card, ListGroup, Badge } from 'react-bootstrap'
import { CustomPlaceHolder, LoadingSpinner } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useQuery } from '@apollo/client'
import { GET_ENROLLEE, getUser } from './gql'
import moment from 'moment'

const ModalContext = createContext()

export default function Index(payload) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { enrolleeId } = payload
  const [attachments, setAttachments] = useState([])
  const [payments, setPayments] = useState([])
  const [details, setDetails] = useState(null)

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const { data, loadingEnrollee } = useQuery(GET_ENROLLEE, {
    skip: !enrolleeId,
    variables: { enrolleeId }
  })

  useEffect(() => {
    setLoading(loadingEnrollee)
  }, [loadingEnrollee])

  useEffect(() => {
    const enrollee = _.has(data, 'getEnrollee') ? data.getEnrollee : null
    const files = _.has(enrollee, 'files') ? enrollee.files : []
    const payments = _.has(enrollee, 'payments') ? enrollee.payments : []
    const paymentType = _.has(enrollee, 'paymentType')
      ? enrollee.paymentType
      : null
    const status = _.has(enrollee, 'status') ? enrollee.status : null
    const student = _.has(enrollee, 'student') ? enrollee.student : null
    const profile = _.has(student, 'profile') ? student.profile : null
    const firstName = _.has(profile, 'firstName') ? profile.firstName : null
    const lastName = _.has(profile, 'lastName') ? profile.lastName : null
    const studentName = `${firstName} ${lastName}`
    const lrnNo = _.has(profile, 'lrnNo') ? profile.lrnNo : null

    setAttachments(files)
    setPayments(payments)
    setDetails({
      paymentType,
      status,
      studentName,
      lrnNo
    })
  }, [data])

  const contextPayload = useMemo(
    () => ({
      payments,
      attachments,
      details
    }),
    [payments, attachments, details]
  )

  return (
    <ModalContext.Provider value={contextPayload}>
      <Button variant='link' onClick={handleShow} disabled={loading}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FontAwesomeIcon icon={solid('eye')} /> View
          </>
        )}
      </Button>

      <Modal size='lg' show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Enrollment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>
              <Card.Title>Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Details />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Remarks</Card.Title>
            </Card.Header>
            <Card.Body>
              <Remarks />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Payments</Card.Title>
            </Card.Header>
            <Card.Body>
              <Payments />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Attachments</Card.Title>
            </Card.Header>
            <Card.Body>{attachments.map(ImageViewer)}</Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()} variant='primary'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </ModalContext.Provider>
  )
}

const ImageViewer = (payload) => {
  const { filePath, loading, ...etc } = payload
  if (filePath) {
    return (
      <CustomPlaceHolder loading={loading}>
        <Image src={filePath} thumbnail fluid />
      </CustomPlaceHolder>
    )
  }

  return (
    <CustomPlaceHolder loading={loading}>
      <object
        className='img-fluid rounded-circle'
        data={filePath}
        type='image/*'
      >
        <Image
          src='/assets/img/user/user-empty.png'
          fluid
          roundedCircle
          thumbnail
        />
      </object>
    </CustomPlaceHolder>
  )
}

const Payments = () => {
  const { payments } = useContext(ModalContext)

  return (
    <ListGroup>
      {payments.map((i) => {
        const amount = _.has(i, 'amount') ? parseFloat(i.amount) : 0
        const createdAt = _.has(i, 'createdAt') ? i.createdAt : null
        const createdBy = _.has(i, 'createdBy') ? i.createdBy : null

        return (
          <ListGroup.Item
            as='li'
            className='d-flex justify-content-between align-items-start'
          >
            <div className='ms-2 me-auto'>
              <div className='fw-bold'>
                ₱ {amount.toFixed(2).toLocaleString()}
              </div>
              <i>Created By:</i> <CreatedBy createdBy={createdBy} />
            </div>
            <Badge bg='primary' pill>
              {moment(createdAt).format('lll')}
            </Badge>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

const CreatedBy = ({ createdBy }) => {
  const [name, setName] = useState(null)

  const { data, loadingUser } = useQuery(getUser, {
    variables: {
      id: createdBy
    }
  })

  useEffect(() => {
    const user = _.has(data, 'getUser') ? data.getUser : null
    const profile = _.has(user, 'profile') ? user.profile : null
    const fName = _.has(profile, 'firstName') ? profile.firstName : null
    const lName = _.has(profile, 'lastName') ? profile.lastName : null
    const fullName = `${fName} ${lName}`

    setName(fullName)
  }, [data])

  return loadingUser ? <LoadingSpinner /> : name
}

const Details = () => {
  const { details, payments } = useContext(ModalContext)
  const [totalPayment, setTotalPayment] = useState(0)
  const studentName = _.has(details, 'studentName') ? details.studentName : null
  const paymentType = _.has(details, 'paymentType') ? details.paymentType : null
  const status = _.has(details, 'status') ? details.status : null
  const lrnNo = _.has(details, 'lrnNo') ? details.lrnNo : null

  useEffect(() => {
    let iTotal = 0

    _.map(payments, (i) => {
      iTotal += parseInt(i.amount)
    })

    setTotalPayment(iTotal)
  }, [payments])

  return (
    <ListGroup>
      <ListGroup.Item
        as='li'
        className='d-flex justify-content-between align-items-start'
      >
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>{studentName}</div>
          Student
        </div>
        <Badge bg='primary' pill>
          LRN# {lrnNo}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as='li'
        className='d-flex justify-content-between align-items-start'
      >
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>{paymentType}</div>
          Payment Type
        </div>
        <Badge bg='primary' pill>
          {status}
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as='li'
        className='d-flex justify-content-between align-items-start'
      >
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>
            ₱ {totalPayment.toFixed(2).toLocaleString()}
          </div>
          Total Payment
        </div>
      </ListGroup.Item>
    </ListGroup>
  )
}

const Remarks = () => {
  const { payments } = useContext(ModalContext)

  return (
    <ListGroup>
      {payments.map((i) => {
        const others = _.has(i, 'others') ? i.others : null
        const remarks = _.has(others, 'remarks') ? others.remarks : null
        const createdBy = _.has(i, 'createdBy') ? i.createdBy : null
        const createdAt = _.has(i, 'createdAt') ? i.createdAt : null

        return (
          <ListGroup.Item
            as='li'
            className='d-flex justify-content-between align-items-start'
          >
            <div className='ms-2 me-auto'>
              <div className='fw-bold'>
                <CreatedBy createdBy={createdBy} />
              </div>
              {remarks}
            </div>
            <Badge bg='primary' pill>
              {moment(createdAt).format('lll')}
            </Badge>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}
