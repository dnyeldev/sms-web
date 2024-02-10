/* eslint-disable react/jsx-props-no-spreading */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  useCallback,
  useEffect, useState,
} from 'react';
import {
  Alert,
  Button,
  Modal,
} from 'react-bootstrap';

export default function Index(payload) {
  const {
    title, heading, message, onClose, status, icon, ...etc
  } = payload;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [message]);

  const onConfirm = useCallback(() => {
    setVisible(false);
    onClose(false);
  });

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
      {...etc}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant={status}>
          <Alert.Heading>
            {status === 'success' && <FontAwesomeIcon icon={solid('circle-check')} />}
            {status === 'danger' && <FontAwesomeIcon icon={solid('circle-xmark')} />}
            {status === 'warning' && <FontAwesomeIcon icon={solid('circle-exclamation')} />}
            {status === 'info' && <FontAwesomeIcon icon={solid('circle-info')} />}
            {' '}
            {heading}
          </Alert.Heading>
          <p>{message}</p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          <FontAwesomeIcon icon={solid('circle-check')} />
          {' '}
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
