import React, { useCallback, useEffect } from 'react';
import {
  Form, Row, Col, Button, Modal,
} from 'react-bootstrap';
import { bool, func } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import FileViewer from 'react-file-viewer';

import FILE from '../../../assets/terms&conditionStudent.docx';

export default function Index({ visible, onClose, onAgreeChange }) {
  // const [canClose, setCanClose] = useState(false);
  const { control, watch } = useForm();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const watchAgreed = watch('agreed');

  useEffect(() => {
    // if (watchAgreed) { setCanClose(true); } else { setCanClose(false); }

    onAgreeChange(watchAgreed);
  }, [watchAgreed]);

  return (
    <Modal
      show={visible}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>LearnLive User Agreement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            <FileViewer
              fileType="docx"
              filePath={FILE}
            />
          </Col>
        </Row>
        <Form noValidate>
          <Controller
            name="agreed"
            control={control}
            rules={{ required: 'You must agree to proceed.' }}
            autoFocus
            render={({ field }) => (
              <Form.Group className="form-group">
                <Form.Check
                  className="form-check form-check-xs form-checkbox"
                  label={<h4 className="text-info">I agree to "User Agreement"</h4>}
                  feedback="You must agree before submitting."
                  {...field}
                  checked={field.value || false}
                />
              </Form.Group>
            )}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Index.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired,
  onAgreeChange: func.isRequired,
};
