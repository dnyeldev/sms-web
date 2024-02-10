import React, { useState } from 'react';

import {
  Modal, Button, Row, Col,
} from 'react-bootstrap';

export default function modalConfirm({ onOk, children, message }) {
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    if (onOk) {
      onOk();
    }

    setVisible(false);
  };

  return (
    <>
      { children({ onClick: () => setVisible(true) })}
      { visible && (
      <Modal size="sm" show={visible} onHide={() => setVisible(false)} centered>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <p>
                {message}
              </p>
            </Col>
            <Col lg={12}>
              <div className="d-flex gap-2 justify-content-center">
                <Button onClick={() => handleOk()} variant="primary">Yes</Button>
                <Button onClick={() => setVisible(false)} variant="secondary">No</Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      )}
    </>
  );
}
