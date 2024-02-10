/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useEffect, useState,
} from 'react';
import {
  Modal,
} from 'react-bootstrap';

export default function Index(payload) {
  const { loading = false, children } = payload;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [loading]);

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Loading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card success-card">
          <div className="card-body">
            <div className="success-cont">
              <i className="fa fa-spin fa-spinner" aria-hidden="true" />
              {children}
            </div>
          </div>
        </div>

      </Modal.Body>
    </Modal>
  );
}
