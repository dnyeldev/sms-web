import React, {
  useCallback, useContext, useState,
} from 'react';
import {
  Modal, Button, Alert, Form, Spinner,
} from 'react-bootstrap';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import CancelBookingContext from './cancelBooking.context';
import { cancelBookingMutation, cancelTutorSessionMutation } from './gql';
import { LoginContext } from '../../pages/login';
import { NotificationModal } from '../../components';
import useCreateAuditTrail from '../../pages/auditTrail/useCreateAuditTrail';

export default function Index() {
  const { title, sessionUid, setEvent } = useContext(CancelBookingContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { instanceUid, roleCode, userUid } = useContext(LoginContext);
  const [message, setMessage] = useState(null);
  const [messageTitle, setTitle] = useState(null);
  const [heading, setHeading] = useState(null);
  const [status, setStatus] = useState(null);

  const {
    handleSubmit, formState, control, reset, setError
  } = useForm();
  const { errors } = formState;

  const { doInsertAuditTrail } = useCreateAuditTrail();

  const [cancelBooking] = useMutation(cancelBookingMutation, {
    onCompleted: () => {
      doInsertAuditTrail({
        action: 'CANCEL',
        changes: `Cancelled ${title} session`,
        module: 'Calendar',
      });

      setStatus('success');
      setTitle('Booking Cancellation Success');
      setHeading('Greate!');
      setMessage('You have successfully cancelled your booking!');
      setVisible(false);
      setEvent(null);
    },
    onError: (error) => {
      const message = _.has(error, 'message') ? error.message : null

      setError('confirm', { message })
    }
  });

  const [cancelTutor] = useMutation(cancelTutorSessionMutation, {
    onCompleted: () => {
      doInsertAuditTrail({
        action: 'CANCEL',
        changes: `Cancelled ${title} session`,
        module: 'Calendar',
      });

      setStatus('success');
      setTitle('Booking Cancellation Success');
      setHeading('Greate!');
      setMessage('You have successfully cancelled your booking!');
      setVisible(false);
      setEvent(null);
    },
    onError: (error) => {
      const message = _.has(error, 'message') ? error.message : null

      setError('confirm', { message })
    }
  });

  const submitForm = useCallback(() => {
    async function doSubmit() {
      setLoading(true);

      if (roleCode === 'TUTEE') {
        await cancelBooking({
          variables: {
            sessionUid,
            tuteeUid: instanceUid,
            updatedBy: userUid,
          },
        });
      } else if (roleCode === 'TUTOR') {
        await cancelTutor({
          variables: {
            sessionUid,
            tutorUid: instanceUid,
            updatedBy: userUid,
          },
        });
      }

      setLoading(false);
    }

    doSubmit();
  }, [sessionUid, instanceUid, roleCode]);

  const triggerSubmit = () => {
    handleSubmit(submitForm)();
  };

  const isYes = ((value) => {
    const isValid = _.toLower(value) === 'yes';

    if (!isValid) { return 'Please reply with "YES"'; }

    return isValid;
  });

  const onShow = useCallback(() => {
    setVisible(true);
  });

  const onClose = useCallback(() => {
    setVisible(false);
    reset();
  });

  return (
    <>
      <Button variant="secondary" onClick={onShow}>
        <FontAwesomeIcon icon={solid('calendar-xmark')} />
        {' '}
        Cancel Booking
      </Button>

      <Modal
        show={visible}
        keyboard={false}
        onHide={onClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={solid('calendar-xmark')} />
            {' '}
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <Alert.Heading>
              <FontAwesomeIcon icon={solid('exclamation-triangle')} />
              {' '}
              Warning!
            </Alert.Heading>
            <p>You are about to cancel your booked session.</p>
            <p>Please input "YES" to confirm.</p>
          </Alert>
          <Form noValidate>
            <Form.Group className="form-group" controlId="hide.confirm">
              <Form.Label>Input "YES" to confirm</Form.Label>
              <Controller
                name="confirm"
                control={control}
                rules={{
                  required: 'Confirmation is required.',
                  validate: {
                    isYes,
                  },
                }}
                render={({ field }) => (
                  <Form.Control
                    autoFocus
                    isInvalid={!!_.has(errors, 'confirm')}
                    {...field}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {_.has(errors, 'confirm') ? errors.confirm.message : 'Invalid confirm.'}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={onClose}>
            <FontAwesomeIcon icon={solid('xmark')} />
            {' '}
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={triggerSubmit}
            disabled={loading}
          >
            {
              loading ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : <FontAwesomeIcon icon={solid('calendar-xmark')} />
            }
            {' '}
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <NotificationModal
        title={messageTitle}
        heading={heading}
        status={status}
        message={message}
        onClose={() => {
          setTitle(null);
          setHeading(null);
          setStatus(null);
          setMessage(null);
        }}
      />
    </>
  );
}
