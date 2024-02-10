import React, { useCallback, useContext, useEffect, useState } from 'react';
import _ from 'lodash'
import {
  Modal, Button, Row, Col, Form,
} from 'react-bootstrap';
import { AlertError, LoadingSpinner } from '../../../components';
import styledComponents from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { CREATE_SECTION } from './gql';
import { useMutation } from '@apollo/client';
import { LoginContext } from '../../login';
import GRADE_LEVELS from '../../../constants/gradeLevels'

const WrapFileViewer = styledComponents.div`
  .pg-viewer {
    min-height: 50vh;
  }

  video {
    width: 100%;
  }

  .photo-viewer-container {
    width: 50vw;
    height: auto;
    min-height: 50vh;
  }

  .pg-viewer-wrapper .pg-viewer .photo-viewer-container img {
    width: 100% !important;
    height: auto !important;
  }
`

export default function Index(payload) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const formInstant = useForm();
  const { userId } = useContext(LoginContext)

  const {
    handleSubmit, formState, control, reset
  } = formInstant;
  const { errors } = formState;

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    reset()
    setVisible(false)
  }

  const [create, { loading }] = useMutation(CREATE_SECTION, {
    onCompleted: async (result) => {
      handleClose()
    },
    onError: (err) => {
      const message = _.has(err, 'message') ? err.message : err.toString()
      setError(message);
    },
  });

  const onSubmit = useCallback((data) => {
    create({
      variables: { ...data, createdBy: userId },
    });
  }, [create, userId]);

  return (
    <>
      <Button disabled={loading} onClick={handleShow}>
        <FontAwesomeIcon icon={solid('people-roof')} />
        {' '}
        {loading ? 'Loading…' : 'Create Section'}
      </Button>


      <Modal show={visible} onHide={handleClose} centered>
        <Form noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Create Section
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={12}>

                <Row className="mb-3">
                  <Form.Group as={Col} sm={12} controlId="section.name">
                    <Form.Label>Title</Form.Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'name')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {_.has(errors, 'name') ? errors.name.message : 'Invalid name.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={12} controlId="section.gradeLevel">
                    <Form.Label>Grade Level</Form.Label>
                    <Controller
                      name="gradeLevel"
                      control={control}
                      rules={{ required: 'Grade level is required.' }}
                      render={({ field }) => (
                        <Form.Select
                          isInvalid={!!_.has(errors, 'gradeLevel')}
                          {...field}
                        >
                          {GRADE_LEVELS.map(g => <option>{g}</option>)}
                        </Form.Select>
                      )}
                    />
                    <p className="text-danger mt-1" style={{ fontSize: '.875em' }}>
                      {_.has(errors, 'gradeLevel') ? errors.gradeLevel.message : ''}
                    </p>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                {error && (
                  <Col lg={12}>
                    <AlertError
                      error={error}
                      title={'Create Error'}
                      onClose={() => setError(null)}
                    />
                  </Col>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleClose()} variant="link">Close</Button>
            <Button variant="primary" disabled={loading} type='submit'>
              {loading ? <LoadingSpinner /> : 'Create'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </>
  );
}

const CustomInput = React.forwardRef((props, inRef) => <Form.Control ref={inRef} {...props} />);

const DatePicker = React.forwardRef(({ value, isInvalid, ...etc }, ref) => (
  <ReactDatePicker
    dateFormat="yyyy-MM-dd"
    customInput={<CustomInput isInvalid={isInvalid} />}
    selected={value}
    minDate={new Date()}
    {...etc}
  />
));
