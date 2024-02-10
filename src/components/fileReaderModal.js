import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import {
  Modal, Button, Row, Col,
} from 'react-bootstrap';
import { LoadingSpinner } from '.';
import FileViewer from 'react-file-viewer';
import styledComponents from 'styled-components';

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
  const [type, setType] = useState(false)
  const {
    buttonViewText = 'View File',
    fileType,
    filePath,
    title,
    loading
  } = payload

  useEffect(() => {
    if (fileType) {
      const splitted = _.split(fileType, '/')
      const last = _.last(splitted)

      setType(last)
    }
  }, [fileType])

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Button variant="link" onClick={handleShow} disabled={loading}>
        {loading ? <LoadingSpinner /> : buttonViewText}
      </Button>

      <Modal size="lg" show={visible} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <WrapFileViewer>
                <FileViewer
                  key={Math.random()}
                  fileType={type}
                  filePath={filePath}
                  onError={(err) => console.log({ err })}
                  headers={{
                    'Content-Type': 'application/json'
                  }}
                />
              </WrapFileViewer>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()} variant="primary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
