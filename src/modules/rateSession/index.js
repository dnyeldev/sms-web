/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Button, Modal, Card, Form,
} from 'react-bootstrap';
import { useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { Ratings } from '../../components';
import RateSessionContext from './rateSession.context';
import { addReviewMutation, getSessionQuery } from './gql';
import { LoginContext } from '../../pages/login';
import useCreateAuditTrail from '../../pages/auditTrail/useCreateAuditTrail';
import { isFavoriteTutorQuery } from './gql';

export default function Index(payload) {
  const [view, setView] = useState(false);
  const { userUid, instanceUid } = useContext(LoginContext);
  const {
    handleSubmit, formState, control, reset, watch, setValue
  } = useForm();
  const { errors } = formState;
  const { onRated } = payload;

  const {
    sessionUid,
    interest,
  } = useContext(RateSessionContext);

  const { doInsertAuditTrail, userFullName } = useCreateAuditTrail();
  const [getSession] = useLazyQuery(getSessionQuery)
  const [getFavorite] = useLazyQuery(isFavoriteTutorQuery)

  useEffect(() => {
    if (sessionUid) {
      setView(true);
    } else {
      setView(false);
    }

    async function doCheckFavorite() {
      // get tutor details from session
      const tutorUid = await getSession({
        variables: { uid: sessionUid }
      }).then(result => {
        const data = _.has(result, 'data') ? result.data : null
        const session = _.has(data, 'getSession') ? data.getSession : null
        const timeslot = _.has(session, 'timeslot') ? session.timeslot : null
        const profile = _.has(timeslot, 'tutorialProfile') ? timeslot.tutorialProfile : null
        const tutorUid = _.has(profile, 'tutorUid') ? profile.tutorUid : null

        return tutorUid
      })

      const isFav = await getFavorite({
        variables: { tuteeUid: instanceUid, tutorUid }
      }).then(result => {
        const data = _.has(result, 'data') ? result.data : null
        const isFavTutor = _.has(data, 'isFavoriteTutor') ? data.isFavoriteTutor : null

        return isFavTutor
      })

      setValue('favorite', isFav)
    }

    if (sessionUid) {
      doCheckFavorite()
    }
  }, [sessionUid]);

  const handleClose = useCallback(() => {
    setView(false);
    reset();
  }, [sessionUid]);

  const [mutateReview, { loading }] = useMutation(addReviewMutation, {
    onCompleted: () => {
      const ratings = watch('ratings');
      doInsertAuditTrail({
        action: 'RATE',
        changes: `${userFullName} Rated his/her tutor of ${interest} session a ${ratings}-stars rating`,
        module: 'Sessions',
        details: {
          sessionUid,
        },
      });
      if (onRated) { onRated(); }

      handleClose();
    },
  });

  const submitForm = useCallback((props) => {
    mutateReview({ variables: { ...props, sessionUid, userUid } });
  }, [sessionUid]);

  const onRate = useCallback(() => {
    handleSubmit(submitForm)();
  });

  const watchFavorite = watch('favorite')

  return (
    <Modal
      show={view}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Rate Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>
              Interest
              {' '}
              <small className="text-muted">{interest}</small>
            </Card.Title>
            <Card.Subtitle>Please rate your experience on your tutor.</Card.Subtitle>
            <br />
            <Form noValidate onSubmit={handleSubmit(submitForm)}>
              <Form.Group className="form-group" controlId="rate.review">
                <Form.Label>Feedback</Form.Label>
                <Controller
                  name="review"
                  control={control}
                  rules={{ required: 'Review is required.' }}
                  render={({ field }) => (
                    <Form.Control
                      autoFocus
                      isInvalid={!!_.has(errors, 'review')}
                      as="textarea"
                      rows={4}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {_.has(errors, 'review') ? errors.review.message : 'Invalid review.'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group" controlId="rate.ratings">
                <Form.Label className="form-control-label">Ratings</Form.Label>
                <Controller
                  name="ratings"
                  control={control}
                  rules={{ required: 'Ratings is required.' }}
                  render={({ field }) => (
                    <Form.Control
                      isInvalid={!!_.has(errors, 'ratings')}
                      {...field}
                      // eslint-disable-next-line react/no-unstable-nested-components
                      as={(item) => <Ratings {...item} size="xl" />}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {_.has(errors, 'ratings') ? errors.ratings.message : 'Invalid ratings.'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group" controlId="rate.favorite">
                <Form.Label className="form-control-label">Favorite</Form.Label>
                <Controller
                  name="favorite"
                  control={control}
                  render={({ field }) => (
                    <Form.Check
                      type="checkbox"
                      label="Mark tutor as favorite"
                      isInvalid={!!_.has(errors, 'favorite')}
                      checked={watchFavorite}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {_.has(errors, 'favorite') ? errors.ratings.message : 'Invalid favorite.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={onRate}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
